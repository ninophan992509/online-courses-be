const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const {ErrorHandler} = require('../exceptions/error');
const SECRET_KEY = require('../config/config.json').SECRET_KEY;
const db = require('../models');
const User = require('../models/user')(db.sequelize, db.Sequelize.DataTypes);
const USER_TYPE = require('../enums/user-type.enum');
const USER_STATUS = require('../enums/user-status.enum');

exports.Register = async function(user){
    const userWithSameUsername = await User.findOne({ where: { username: user.username } });
    if (userWithSameUsername != null) {
        throw new ErrorHandler(400, "Username existed");
    }
    user.password = bcrypt.hashSync(user.password, 10);
    user.status = USER_STATUS.active;
    user.type = USER_TYPE.user;
    const result = await User.create(user);
    var val = result.dataValues;
    delete val.password;
    return val;
}

exports.SignIn = async function(auth){
    var user = await User.findOne({ where: { username: auth.username } });
    if (user == null) throw new ErrorHandler(404, "Wrong username or password");
    if (!bcrypt.compareSync(auth.password,user.password)) throw new ErrorHandler(404, "Wrong username or password");

    const payload = {
        userId : user.id
    };
    const opts = {
      expiresIn: 10
    }
    var accessToken = jwt.sign(payload,SECRET_KEY, opts);
    var rfToken = randomstring.generate(50);
    user.refreshtoken = rfToken;
    await user.save();
    return {
        accessToken,
        rfToken
      };
}

exports.CreateAccessToken = async function(token){
    var payload = {};
    try{
        payload = jwt.verify(token.accessToken,SECRET_KEY,{ignoreExpiration:true});
    }catch (err){
        throw new ErrorHandler(401, 'Invalid access token');
    }
    const user = await User.findByPk(payload.userId);
    if (user.refreshtoken != token.refreshToken) throw new ErrorHandler(400,'Invalid refresh token');

    delete payload.iat;
    delete payload.exp;

    const opts = {
      expiresIn: 10
    }
    var newAccessToken = jwt.sign(payload,SECRET_KEY, opts);
    return{
        accessToken: newAccessToken
    };
}