const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config/config.json').SECRET_KEY;
//const userModel = require('../models/user.model');
const USER_TYPE = require('../enums/user-type.enum');

module.exports = function (req, res, next) {
    var accessTokenPayload = req.accessTokenPayload;

    if (accessTokenPayload.type !== USER_TYPE.admin) {
        return res.status(403).json({
            message: 'Permission denied'
        });
    }

    next();
}