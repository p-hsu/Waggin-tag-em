const sequelize = require('../config/connection');
const { Pet, User } = require('../models');
const router = require('express').Router();
// const withAuth = require('../utils/auth');

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
            }
        ]
    })
    .then(petData => {
        const pets = petData.map(pet => pet.get({ plain: true }));
        console.log("this is the pets+++++++++", pets)
        res.render('homepage', { pets, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;