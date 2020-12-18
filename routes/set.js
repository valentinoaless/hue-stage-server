const router = require('express').Router();
const User = require('../model/User.model');
const Set = require('../model/Set.model').SetModel;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');

const generateURL = (length) => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let url = "";
    for(let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length) 
      url += str[index];  
    }

    let exists = User.findOne({url: url});
    return exists.length===1 ? generateURL(length) : url;
}


router.post('/newset', verify, async (req, res) => {

    let user = await User.findById(req.user._id);

    console.log(req.body);

    if(user) {
        Set.create({
            name: req.body.setName,
            timeMethod: req.body.timeMethod,
            url: generateURL(10),
            creator: user.username,
        }).then(set => {
            user.sets.push(set._id);
            user.save();
            console.log(set);
            res.send(set);
        }).catch(err => {
            console.log(err);
            res.status(400).send('error creating set');
        })
    } else {
        res.status(401).send('user not found');
    }


    


})

module.exports = router;

