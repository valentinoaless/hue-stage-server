const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User.model');

router.get("/community", verify, async (req, res) => {
    
    res.send('here are your posts');
    
})

module.exports = router;