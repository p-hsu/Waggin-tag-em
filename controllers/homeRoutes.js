const sequelize = require('../config/connection');
const { Pet, User, Image } = require('../models');
const router = require('express').Router();
const fs = require('fs');
const upload = require('../utils/multer')
const withAuth = require('../utils/auth');

// Home page lists all pets in database
router.get('/', (req, res) => {
    Pet.findAll({
        attributes: [
            'name',
            'about_me',
            'temperament',
            'about_you',
            'age',
            'sex',
            'breed'
        ],
        include: [
            {
                model: User,
                attributes: ['user_name']
            },
            {
                model: Image,
                attributes: ['name']
            }
        ]
    })
    .then(petData => {
        const pets = petData.map(pet => pet.get({ plain: true }));
        res.render('homepage', { pets, logged_in: req.session.logged_in });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/profile', async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        if(req.session.logged_in){
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Pet,
                    include:{
                        model: Image
                    }
                }
            ],
        });
        console.log(userData)
        const user = userData.get({ plain: true });
        console.log(user)
        res.render('profile', {
            ...user,
            logged_in: req.session.logged_in
        });
 }
    } catch (err) {
        res.status(500).json(err);
       
}});

// get request for new-pet view
router.get('/profile/new-pet', withAuth, async (req, res) => res.render('new-pet', { logged_in: req.session.logged_in } ));


// post request > stores into uploads, tmp, and db using pet_id
router.post("/profile/new-pet", upload.single("myImage"), async (req, res) => {
    try {
        console.log(req.file);

        // if (req.file == undefined) {
        //   return res.send("No file was selected.");
        // }

       await Image.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: fs.readFileSync('./public/uploads/' + req.file.filename),
            user_id: req.session.user_id,
        })

        res.redirect('/profile/new-pet');

    } catch (err) {
      console.log(err);
      // res.send(`Upload unsucessful: ${err}`);
      res.status(400).json(err);
    }
  });



module.exports = router;