const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config/config.json').SECRET_KEY;
//const userModel = require('../models/user.model');
const USER_TYPE = require('../enums/user-type.enum');

module.exports = (roles) => function (req, res, next) {
    var accessTokenPayload = req.accessTokenPayload;

    if (roles === undefined || !roles.includes(accessTokenPayload.type)) {
        return res.status(403).json({
            message: 'Permission denied'
        });
    }

    next();
}