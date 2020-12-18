let jwt = require('jsonwebtoken');

module.exports = function verify(req,res,next){

    console.log(req.headers['auth_token'], 'this is a token');

    const token = req.headers['auth_token'];
    
    if(!token) {
        return res.status(401).send('Access Denied')
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = verified;
        next();
    } catch {
        res.status(400).send('Invalid token');
        console.log('invalid token');
    }

}