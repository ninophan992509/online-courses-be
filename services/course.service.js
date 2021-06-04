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


exports.findMostEnrolled = async function () {
    return await Courses.findAndCountAll({
        where: {
            status: STATUS.active
        },
        order: [
            ['number_enrolled', 'DESC']
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
    const result = await Courses.findAndCountAll({
        where: whereObj,
        limit,
        offset: page - 1,
    });
    const extraData = await Promise.all([
        exports.findNewest(),
        exports.findMostEnrolled(),
        exports.getListHighlightCourses(),
    ]);
    const check = {
        isNew: Set(),
        mostEnrolled: Set(),
        highlight: Set(),
    }
    extraData[0].rows.forEach(x => { check.isNew.add(x.id); });
    extraData[1].rows.forEach(x => { check.mostEnrolled.add(x.id); });
    extraData[2].rows.forEach(x => { check.highlight.add(x.id); });
    result.rows.forEach(x => {
        if (check.isNew.has(x.id)) {
            x.isNew = true;
        } else {
            x.isNew = false;
        }
        if (check.mostEnrolled.has(x.id)) {
            x.mostEnrolled = true;
        } else {
            x.mostEnrolled = false;
        }
        if (check.highlight.has(x.id)) {
            x.highlight = true;
        } else {
            x.highlight = false;
        }
    });
    return result;
}


exports.create = async function (course) {
    return await Courses.create(course);
}

exports.update = async function (dbEntity, updateEntity) {
    return await dbEntity.update(updateEntity);
}

exports.getListHighlightCourses = async function () {
    return await Courses.findAll({
        where: {
            createdAt: {
                [Op.gt]: Date.now() - 7 * 24 * 3600 * 1000
            }
        },
        limit: 10,
        order: [['rating', 'DESC']]
    });
}

exports.GetListMostViewsCourses = async function () {
    const result = await db.sequelize.query(
        "select c.* from watch_lists as w inner join courses as c on w.course_id = c.id group by course_id order by count(w.course_id) desc limit 2",
        QueryTypes.SELECT);
    return result[0];
}