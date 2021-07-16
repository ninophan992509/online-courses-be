const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const { ErrorHandler } = require('../exceptions/error');
const SECRET_KEY = require('../config/config.json').SECRET_KEY;
const db = require('../models');
const User = require('../models/user')(db.sequelize, db.Sequelize.DataTypes);
const USER_TYPE = require('../enums/user-type.enum');
const USER_STATUS = require('../enums/user-status.enum');
const Response = require('../response/response').Response;

exports.Register = async function (user) {
    const userWithSameEmail = await User.findOne({ where: { email: user.email } });
    if (userWithSameEmail != null) {
        throw new ErrorHandler(400, "Email existed");
    }
    user.password = bcrypt.hashSync(user.password, 10);
    user.status = USER_STATUS.active;
    user.type = USER_TYPE.student;
    const result = await User.create(user);
    var val = result.dataValues;
    delete val.password;
    return new Response(null, true, result);
}

exports.CreateTeacher = async function (user) {
    const userWithSameEmail = await User.findOne({ where: { email: user.email } });
    if (userWithSameEmail != null) {
        throw new ErrorHandler(400, "Email existed");
    }
    user.password = bcrypt.hashSync(user.password, 10);
    user.status = USER_STATUS.active;
    user.type = USER_TYPE.teacher;
    const result = await User.create(user);
    var val = result.dataValues;
    delete val.password;
    return new Response(null, true, result);
}

exports.SignIn = async function (auth) {
    var user = await User.findOne({ where: { email: auth.email } });
    if (user == null) throw new ErrorHandler(404, "Wrong email or password");
    if (!bcrypt.compareSync(auth.password, user.password)) throw new ErrorHandler(404, "Wrong email or password");

    const payload = {
        userId: user.id,
        type: user.type
    };
    const opts = {
        expiresIn: 60*60*1000
    }
    var accessToken = jwt.sign(payload, SECRET_KEY, opts);
    var rfToken = randomstring.generate(100);
    user.refreshtoken = rfToken;
    await user.save();
    const userInfo = user.toJSON();
    delete userInfo.password;
    delete userInfo.refreshtoken;
    delete userInfo.createdAt;
    delete userInfo.updatedAt;
    const result = {
        userInfo,
        accessToken,
        rfToken
    };
    return new Response(null, true, result);
}

exports.CreateAccessToken = async function (token) {
    var payload = {};
    try {
        payload = jwt.verify(token.accessToken, SECRET_KEY, { ignoreExpiration: true });
    } catch (err) {
        throw new ErrorHandler(401, 'Invalid access token');
    }
    const user = await User.findByPk(payload.userId);
    if (user.refreshtoken != token.refreshToken) throw new ErrorHandler(400, 'Invalid refresh token');

    delete payload.iat;
    delete payload.exp;

    const opts = {
        expiresIn: 60*60*1000
    }
    var newAccessToken = jwt.sign(payload, SECRET_KEY, opts);
    const result = {
        accessToken: newAccessToken
    };
    return new Response(null, true, result);
}

exports.DeleteUser = async function(id){
    var user = await User.findOne({
        where: {
            id: id
        }
    });
    if (user){
        user.status = USER_STATUS.deleted;
        await user.save();
    }
}