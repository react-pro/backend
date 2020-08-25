const jwt = require('jsonwebtoken');
const secret = require('config').JWT_SECRET;

module.exports = (req, res, next) => {
    if (!req.headers['authorization']) {
        return res.status(401).json({message: 'Unauthorized user'});
    }

    const jwtToken = req.headers['authorization'].split(' ')[1];
    try {
        req.jwtUser = jwt.verify(jwtToken, secret);
    } catch (err) {
        return res.status(401).json({message: 'Unauthorized user'});
    }

    next();
};
