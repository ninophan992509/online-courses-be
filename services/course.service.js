const { ErrorHandler } = require('../exceptions/error');
const db = require('../models');
const Courses = require('../models/course')(db.sequelize, db.Sequelize.DataTypes);
const Response = require('../response/response').Response;
const STATUS = require('../enums/status.enum');

/**
 * 
 * @param whereObject ex: { category_id: 1, status: STATUS.active }
 * @returns 1 category entity
 */
exports.findOne = async function (whereObject) {
    return await Courses.findOne({
        where: whereObject
    });
}

exports.findNewest = async function () {
    return await Courses.findAndCountAll({
        where: {
            status: STATUS.active
        },
        order: [
            ['createdAt', 'DESC']
        ],
        limit: 10,
        offset: 0,
    });
}

/**
 * 
 * @param whereObject ex: { category_id: 1, status: STATUS.active }
 * @returns  category entities
 */
exports.findByCategory = async function (whereObject) {
    return await Courses.findAll({
        where: whereObject
    });
}


exports.findAll = async function () {
    return await Courses.findAll({ where: { status: STATUS.active } });
}


exports.create = async function (course) {
    return await Courses.create(course)
}

exports.update = async function (dbEntity, updateEntity) {
    return await dbEntity.update(updateEntity);
}