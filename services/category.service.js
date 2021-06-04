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

exports.findAll = async function () {
    return await Categories.findAndCountAll({ where: { status: STATUS.active } });
}

exports.Create = async function (entity) {
    const duplicate = await Categories.findOne({ where: { category_name: entity.category_name } });
    if (duplicate !== null) {
        throw new ErrorHandler(400, "Category existed");
    }

    entity.status = STATUS.active

    const result = await Categories.create(entity);
    return result;
}

/**
 * 
 * @param whereObject ex: {id: 1, category_name: "Little cat"}
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

