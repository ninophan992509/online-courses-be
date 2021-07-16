const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config/config.json').SECRET_KEY;
//const userModel = require('../models/user.model');

module.exports = function (req) {
    const accessToken = req.headers['x-access-token'];

    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, SECRET_KEY);
            return decoded;
        } catch (err) {
            return null;
        }
    }
    return null;
}