const router = require('express').Router();
const upload = require('../../utils/upload')
const { User, Pet, Upload } = require('../../models');

router.post('/', (req, res) => {
    res.send('test');
})






module.exports = router;