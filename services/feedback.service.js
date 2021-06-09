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

exports.findNewest = async function () {
    return await Feedbacks.findAndCountAll({
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

exports.checkEnrollCourse = async function (courseId, userId) {
    const result = await db.sequelize.query(
        'SELECT case when COUNT(*) > 0 then true else false end as isRegister FROM enroll_lists el where el.createdBy = $userId AND el.courseId = $courseId',
        {
            bind: { courseId, userId },
            type: QueryTypes.SELECT
        }
    );
    return result[0];
}


exports.create = async function (entity) {
    return await Feedbacks.create(entity)
}

exports.update = async function (dbEntity, updateEntity) {
    return await dbEntity.update(updateEntity);
}
