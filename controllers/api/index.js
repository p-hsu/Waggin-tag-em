const router = require('express').Router();
// const userRoutes = require('./userRoutes');
// const postRoutes = require('./postRoutes');
const petRoutes = require('./petRoutes')

// router.use('/users', userRoutes);
// router.use('/posts', postRoutes);
router.use('/petRoutes', petRoutes)

module.exports = router;
