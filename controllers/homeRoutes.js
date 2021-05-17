const sequelize = require('../config/connection');
const { Pet, User, Image } = require('../models');
const router = require('express').Router();
// const withAuth = require('../utils/auth');

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
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Pet
                },
                {
                    model: Image,
                    attributes: ['name']
                }
            ],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
  }
});

// rendering images by id
router.get("/:id", async (req, res) => {
    // find one image by id
    try {
      const imgData = await Image.findByPk(req.params.id, {
        include: [
          {
            model: Pet,
          },
        ],
      });
  
      const image = imgData.get({ plain: true });
  
      res.render('profile', {
          ...image,
          logged_in:req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;