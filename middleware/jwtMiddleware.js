const env = process.env.NODE_ENV || 'development';
const jwt = require('jsonwebtoken');
// const config = require('../config/config.js')[env];

function auth() {
    return (req, res, next) => { 
        // Get token from header
        const token = req.header('x-auth-token');

        // Check if token exists
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Add user from payload to request object
            req.user = decoded.user;
            next();
        } catch (err) {
            res.status(401).json({ msg: 'Token is not valid' });
        }
    }

};

module.exports = auth;