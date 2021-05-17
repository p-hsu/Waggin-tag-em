const router = require('express').Router();
const  {Pet, User, Image} = require('../../models');
const fs = require('fs');
const upload = require('../../utils/multer')

// >>>>>>>>>> FOR IMAGES BELONGING TO PET <<<<<<<<<<<<<<

// post request > stores into uploads, tmp, and db using pet_id
router.post("/upload", upload.single("myImage"), async (req, res) => {
  try {
    console.log(req.file);

    // if (req.file == undefined) {
    //   return res.send("No file was selected.");
    // }

    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync('./public/uploads/' + req.file.filename),
      user_id: req.session.user_id,
    }).then((image) => {
      fs.writeFileSync("./public/tmp/" + image.name, image.data);

    //   res.send(`Upload sucess!`);
    res.render('profile');
    });
  } catch (err) {
    console.log(err);
    // res.send(`Upload unsucessful: ${err}`);
    res.status(400).json(err);
  }
});



module.exports = router;