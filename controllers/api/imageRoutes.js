const router = require("express").Router();
const { Pet, User, Image } = require("../../models");
const withAuth = require("../../utils/auth");
const fs = require("fs");
//const multer = require("multer")
const upload = require("../../utils/multer");
// const upload = multer({dest: "./public/uploads"})

// >>>>>>>>>> FOR IMAGES BELONGING TO PET <<<<<<<<<<<<<<
// post request > stores into uploads, tmp, and db using pet_id
router.post("/upload", upload.single("myImage"), async (req, res)=> {
  try {
    console.log(req.file)
    

    // if (req.file == undefined) {
    //   return res.send("No file was selected.");
    // }
    // let data = fs.readFileSync("./public/uploads/" + req.file.filename);
    // console.log(data);
    // let newImage = Image.create({
    //   type: req.file.mimetype,
    //   name: req.file.originalname,
    //   data: data,
    //   user_id: req.session.user_id,
    // });

    // if (newImage) {
    //   const petImage = await Pet.update(
    //     {
    //       image_id: newImage.id,
    //     },
    //     {
    //       where: {
    //         id: req.body.id,
    //       },
    //     }
    //   );
    // }
  } catch (err) {
    console.log(err);
    // res.send(`Upload unsucessful: ${err}`);
    res.status(400).json(err);
  }
});

router.put("/upload", upload.single("image_file"), withAuth, async (req, res) => {
  // update a category by its `id` value
  console.log("PUT REQUEST GOOOOOOOOOOOOOOOOOOOOO");
  try {
    console.log(req.body)
    const petData = await Pet.findByPk(req.body.id);
    console.log(petData)
    const petImageId = petData.image_id;
    console.log(req.file)
    if (petImageId) {
      const imageData = await Image.update(
        {
          type: req.file.mimetype, name: req.file.filename, data: req.file.path
        },
        {
          where: {
            id: petImageId
          },
        }
      );
      res.status(200).json({ message: "Photo updated!" });
      // if (imageData) {
      //   const petImage = await Pet.update(
      //     {
      //       image_id: imageData.id,
      //     },
      //     {
      //       where: {
      //         id: req.body.id,
      //       },
      //     }
      //   );
      // }
    }
    // else {
    //   let data = fs.readFileSync("./public/uploads/" + req.file.filename);
    //   //console.log(data);
    //   let newImage = Image.create({
    //     type: req.file.mimetype,
    //     name: req.file.originalname,
    //     data: data,
    //     user_id: req.session.user_id,
    //   });
    // console.log("CREATING PET HERE")
    //   if (newImage) {
    //     const petImage = await Pet.update(
    //         {
    //           image_id: newImage.id,
    //         },
    //         {
    //           where: {
    //             id: req.body.id
    //           },
    //         }
    //       );
    //   }
    // }

 
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
