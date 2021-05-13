const router = require('express').Router();

const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes')

router.use('/users', userRoutes);
router.use('/petRoutes', petRoutes)

module.exports = router;