const db = require('../models');
const Feedbacks = require('../models/feedback')(db.sequelize, db.Sequelize.DataTypes);
const STATUS = require('../enums/status.enum');
const { QueryTypes } = require('sequelize');
const courseService = require('./course.service');

/**
 * 
 * @param whereObject ex: { categoryId: 1, status: STATUS.active }
 * @returns 1 category entity
 */
exports.findOne = async function (whereObject) {
    return await Feedbacks.findOne({
        where: whereObject
    });
}

exports.findAll = async function (page, limit, courseId) {
    const whereObj = { status: STATUS.active }
    if (courseId) {
        whereObj.courseId = courseId;
    }
    return await Feedbacks.findAndCountAll({
        where: whereObj,
        limit,
        offset: (page - 1) * limit,
    });
}


exports.create = async function (entity) {
    return await Feedbacks.create(entity)
}

exports.update = async function (dbEntity, updateEntity) {
    return await dbEntity.update(updateEntity);
}
