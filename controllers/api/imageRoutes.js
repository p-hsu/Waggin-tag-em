const router = require('express').Router();
const  {Pet, User, Image} = require('../../models');
const fs = require('fs');
const upload = require('../../utils/multer')

// >>>>>>>>>> FOR IMAGES BELONGING TO PET <<<<<<<<<<<<<<

// post request > stores into uploads, tmp, and db using pet_id
router.post("/upload", upload.single("myImage"), async (req, res) => {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send("No file was selected.");
    }

    const imageData = await Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync("/uploads/" + req.file.filename),
      user_id: req.session.user_id,
    }).then((image) => {
      fs.writeFileSync("/tmp/" + image.name, image.data);

      return res.send(
        `Upload sucess! <hr/><img src="${imageData.data}" class="responsive-img">`
      );
    });
  } catch (err) {
    console.log(err);
    return res.send(`Upload unsucessful: ${error}`);
  }
});

// get request to find image table category name by id
router.get("/images", async (req, res) => {
  // find one image by id
  try {
    const imgData = await Image.findByPk(req.params.id, {
      include: [
        {
          model: Pet,
        },
      ],
    });

    if (!imgData) {
      res.status(404).json({ message: "No image found with that ID!" });
      return;
    }
    res.status(200).json(imgData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;