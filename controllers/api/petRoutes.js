const router = require('express').Router();
const  {Pet, User} = require('../../models');
const withAuth = require('../../utils/auth');

// creating new pet
router.post('/', async (req, res) => {
    try {
      const newPet = await Pet.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json({ pet: newPet, message: 'New pet added!' });
    } catch (err) {
      res.status(400).json(err);
    }
  });

// updating existing pet
router.put('/:id', withAuth, async (req, res) => {
  // update a category by its `id` value
  try {
    const petData = await Pet.update({        
      name: req.body.name,
      human: req.body.human,
      breed: req.body.breed,
      temperament: req.body.temperament,
      age: req.body.age,
      sex: req.body.sex,
      about_me: req.body.about_me,
      about_you: req.body.about_you

    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    });

    if (!petData) {
      res.status(404).json({ message: 'No pet with that id, please try again!' });
      return;
    }

    res.status(200).json({pet: petData, message: 'Pet updated!'});
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete existing pet
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const petData = await Pet.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!petData) {
      res.status(404).json({ message: 'No pet with that id, please try again!' });
      return;
    }

    res.status(200).json(petData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;