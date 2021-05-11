const router = require('express').Router();
const  {Pet, User} = require('../../models');
// const withAuth = require('../../utils/auth');

// 
router.get('/', async (req, res) => {
    try {
      const newPetRoutes = await Pet.findAll({
        ...req.body,
            include: [{
                model: User
            }],
        user_id: req.session.user_id,
      });
  
      console.log(newPetRoutes)
      res.status(200).json(newPetRoutes);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.get('/', async (req, res) => {
    try {
      const newSinglePet = await Pet.findByPK({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      console.log(newSinglePet)
      res.status(200).json(newSinglePet);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;