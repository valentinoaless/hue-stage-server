const router = require('express').Router();
const User = require('../model/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');

router.post('/register', async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const emailExists = await User.findOne({email: req.body.email},);

    if(emailExists) {
        return res.send('email is taken')
    }

    const usernameExists = await User.findOne({username: req.body.username},);

    if(usernameExists) {
        return res.send('username is taken')
    }

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    try{ 
        const savedUser = await user.save();
        res.send({username: savedUser.username, email: savedUser.email});
        console.log('user saved');
    } catch(err){
        res.status(400).send(err)
    }

});


router.post('/login', async (req, res) => {

    let userFound = await User.findOne({ $or: [{username: req.body.username}, {email: req.body.username}]});
    
    if (!userFound) return res.status(401).send('invalid credentials');

    console.log(userFound.username);

    let passwordMatches = await bcrypt.compare(req.body.password, userFound.password);
    if(!passwordMatches) return res.status(401).send('invalid credentials');

    const token = jwt.sign({_id: userFound._id}, process.env.TOKEN_KEY);

    res.header('auth-token', token).send(token);

})

router.get('/', verify, async (req, res) => {

    let user = await User.findById(req.user);

    if(!user) return res.status(401).send('Invalid user id');

    res.send({
        authorized: true,
        username: user.username, 
        email: user.email
    });

    console.log(req.user);
})


router.get('/profile', verify, async (req, res) => {

    let user = await User.findById(req.user);

    if(!user) return res.status(401).send('user not found');

    return res.send({username: user.username});


})


module.exports = router;
