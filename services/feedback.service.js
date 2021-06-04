const { ErrorHandler } = require('../exceptions/error');
const db = require('../models');
const Feedbacks = require('../models/feedback')(db.sequelize, db.Sequelize.DataTypes);
const { Response, PageResponse } = require('../response/response');
const STATUS = require('../enums/status.enum');
const { Op, QueryTypes, where } = require('sequelize');
/**
 * 
 * @param whereObject ex: { category_id: 1, status: STATUS.active }
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


exports.findAll = async function (page, limit, course_id) {
    const whereObj = { status: STATUS.active }
    if (course_id) {
        whereObj.course_id = course_id;
    }
    return await Feedbacks.findAndCountAll({
        where: whereObj,
        limit,
        offset: page - 1,
    });
}


exports.create = async function (entity) {
    return await Feedbacks.create(entity)
}

exports.update = async function (dbEntity, updateEntity) {
    return await dbEntity.update(updateEntity);
}

exports.GetListMostViewsCourses = async function () {
    const result = await db.sequelize.query(
        "select c.* from watch_lists as w inner join courses as c on w.course_id = c.id group by course_id order by count(w.course_id) desc limit 2",
        QueryTypes.SELECT);
    return new Response(null, true, result[0]);
}