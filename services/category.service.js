const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const { ErrorHandler } = require('../exceptions/error');
const SECRET_KEY = require('../config/config.json').SECRET_KEY;
const db = require('../models');
const Categories = require('../models/category')(db.sequelize, db.Sequelize.DataTypes);
const Courses = require('../models/course')(db.sequelize, db.Sequelize.DataTypes);
const STATUS = require('../enums/status.enum');
const Response = require('../response/response').Response;

exports.GetAll = async function () {
    var result = await Categories.findAll({ where: { status: STATUS.active } });
    if (result.length == 0) throw new ErrorHandler(204, "No content");
    return new Response(null, true, result);
}

exports.Create = async function (entity) {
    const duplicate = await Categories.findOne({ where: { cat_name: entity.cat_name } });
    if (duplicate !== null) {
        throw new ErrorHandler(400, "Category existed");
    }

    entity.status = STATUS.active

    const result = await Categories.create(entity);
    return new Response(null, true, result);
}

/**
 * 
 * @param whereObject ex: {id: 1, cat_name: "Little cat"}
 * @returns 1 category entity
 */
exports.findOne = async function (whereObject) {
    return await Categories.findOne({
        where: whereObject
    });
}

exports.update = async function (dbEntity, updateEntity) {
    return await dbEntity.update(updateEntity);
}

