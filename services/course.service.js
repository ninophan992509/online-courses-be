const db = require('../models');
const Courses = require('../models/course')(db.sequelize, db.Sequelize.DataTypes);
const STATUS = require('../enums/status.enum');
const { Op, QueryTypes } = require('sequelize');

const LIMIT = 10;
const OFFSET = 0;

/**
 * 
 * @param whereObject ex: { categoryId: 1, status: STATUS.active }
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
        limit: LIMIT,
        offset: OFFSET,
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
        limit: LIMIT,
        offset: OFFSET,
    });
}


exports.findAll = async function (page, limit, categoryId) {
    const whereObj = { status: STATUS.active }
    if (categoryId) {
        whereObj.categoryId = categoryId;
    }
    const result = await Courses.findAndCountAll({
        where: whereObj,
        limit,
        offset: (page - 1) * limit,
    });
    const extraData = await Promise.all([
        exports.findNewest(),
        exports.findMostEnrolled(),
        exports.getListHighlightCourses(),
    ]);
    const check = {
        isNew: new Set(),
        isMostEnrolled: new Set(),
        isHighlight: new Set(),
    }
    extraData[0].rows.forEach(x => { check.isNew.add(x.id); });
    extraData[1].rows.forEach(x => { check.isMostEnrolled.add(x.id); });
    extraData[2].forEach(x => { check.isHighlight.add(x.id); });
    for (let i = 0; i < result.rows.length; i++) {
        let x = result.rows[i].dataValues;
        if (check.isNew.has(x.id)) {
            x.isNew = true;
        } else {
            x.isNew = false;
        }
        if (check.isMostEnrolled.has(x.id)) {
            x.isMostEnrolled = true;
        } else {
            x.isMostEnrolled = false;
        }
        if (check.isHighlight.has(x.id)) {
            x.isHighlight = true;
        } else {
            x.isHighlight = false;
        }
    }
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
        limit: LIMIT,
        order: [['rating', 'DESC']]
    });
}

exports.getListMostViewsCourses = async function () {
    const result = await db.sequelize.query(
        "select c.* from watch_lists as w inner join courses as c on w.courseId = c.id group by courseId order by count(w.courseId) desc limit 2",
        QueryTypes.SELECT
    );
    return result[0];
}