const router = require('express').Router();

const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const imageRoutes = require('./imageRoutes');

router.use('/users', userRoutes);
router.use('/pets', petRoutes);
router.use('/images', imageRoutes)

module.exports = router;