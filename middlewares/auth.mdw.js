const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config/config.json').SECRET_KEY;
//const userModel = require('../models/user.model');

module.exports = async function(req, res, next){
    const accessToken = req.headers['x-access-token'];
    if (accessToken){
        try{
            const decoded = jwt.verify(accessToken,SECRET_KEY);
            req.accessTokenPayload = decoded;
            next();
        }catch (err){
            return res.status(401).json({
                message: 'Invalid access token'
            });
        }
    }else{
        return res.status(404).json({
            message: 'Access token not found'
        });
    }
}