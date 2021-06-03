const { ErrorHandler } = require('../exceptions/error');
const db = require('../models');
const Courses = require('../models/course')(db.sequelize, db.Sequelize.DataTypes);
const { Response, PageResponse } = require('../response/response');
const STATUS = require('../enums/status.enum');
const { Op, QueryTypes, where } = require('sequelize');
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


exports.findAll = async function (page, limit, category_id) {
    const whereObj = { status: STATUS.active }
    if (category_id) {
        whereObj.category_id = category_id;
    }
    return await Courses.findAndCountAll({
        where: whereObj,
        limit,
        offset: page - 1,
    });
}


exports.create = async function (course) {
    return await Courses.create(course)
}

exports.update = async function (dbEntity, updateEntity) {
    return await dbEntity.update(updateEntity);
}

exports.getListHighlightCourses = async function () {
    const result = await Courses.findAll({
        where: {
            createdAt: {
                [Op.gt]: Date.now() - 7 * 24 * 3600 * 1000
            }
        },
        limit: 4,
        order: [['rating', 'DESC']]
    })
    return new Response(null, true, result);
}

exports.GetListMostViewsCourses = async function () {
    const result = await db.sequelize.query(
        "select c.* from watchlists as w inner join courses as c on w.course_id = c.id group by course_id order by count(w.course_id) desc limit 2",
        QueryTypes.SELECT);
    return new Response(null, true, result[0]);
}