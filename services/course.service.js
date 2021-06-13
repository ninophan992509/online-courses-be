const db = require('../models');
const Courses = require('../models/course')(db.sequelize, db.Sequelize.DataTypes);
const EnrollList = require('../models/enroll_list')(db.sequelize, db.Sequelize.DataTypes);
const STATUS = require('../enums/status.enum');
const { Op, QueryTypes } = require('sequelize');
const category = require('../models/category')(db.sequelize, db.Sequelize.DataTypes);
const storage = require('./storage.service');
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


exports.findOneNotDoneOrActive = async function (whereObject) {
    return await Courses.findOne({
        where: {
            ...whereObject, status: {
                [Op.or]: [STATUS.active, STATUS.notDone]
            }
        }
    });
}

exports.findNewest = async function () {
    return await Courses.findAndCountAll({
        where: {
            status: { [Op.or]: [STATUS.active, STATUS.notDone] }
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
            status: { [Op.or]: [STATUS.active, STATUS.notDone] }
        },
        order: [
            ['number_enrolled', 'DESC']
        ],
        limit: LIMIT,
        offset: OFFSET,
    });
}


exports.findAll = async function (page, limit, lstCategoryId, teacherId) {
    const whereObj = { status: { [Op.or]: [STATUS.active, STATUS.notDone] } }
    console.log(">> ~ file: course.service.js ~ line 63 ~ lstCategoryId", lstCategoryId);
    if (lstCategoryId.length > 0) {
        whereObj.categoryId = { [Op.or]: lstCategoryId };
    }
    if (teacherId) {
        whereObj.teacherId = teacherId;
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

exports.findRating = async function (courseId) {
    const result = await db.sequelize.query(
        `SELECT ` +
        `	IFNULL(SUM(CASE WHEN rating = 1 THEN countRating ELSE 0 END), 0) AS '1', ` +
        `	IFNULL(SUM(CASE WHEN rating = 2 THEN countRating ELSE 0 END), 0) AS '2', ` +
        `	IFNULL(SUM(CASE WHEN rating = 3 THEN countRating ELSE 0 END), 0) AS '3', ` +
        `	IFNULL(SUM(CASE WHEN rating = 4 THEN countRating ELSE 0 END), 0) AS '4', ` +
        `	IFNULL(SUM(CASE WHEN rating = 5 THEN countRating ELSE 0 END), 0) AS '5' ` +
        `FROM ( ` +
        `	SELECT ` +
        `		f.rating, count(*) AS countRating ` +
        `	FROM ` +
        `		feedbacks f ` +
        `	WHERE ` +
        `		f.courseId = $courseId ` +
        `		AND f.status = 1 ` +
        `	GROUP BY ` +
        `		f.rating ` +
        `) temp`
        ,
        {
            bind: { courseId },
            type: QueryTypes.SELECT
        }
    );
    return result[0];

}

exports.create = async function (course) {
    return await Courses.create(course);
}

exports.update = async function (dbEntity, updateEntity) {
    return await dbEntity.update(updateEntity);
}

/**
 * 
 * @param {*} course course entity
 * @param {*} entity new feedback entity
 * @param {*} status create: 1, update: 0, delete: -1
 * @param {*} oldEntity old feedback entity
 * @returns 
 */
exports.updateRating = async function (course, entity, status, oldEntity) {
    if (status === 1) {
        const newNumberRating = course.number_rating + 1;
        const newTotalRating = course.total_rating + entity.rating;
        const newRating = Math.round(newTotalRating / newNumberRating * 100) / 100;

        return await course.update({ rating: newRating, number_rating: newNumberRating, total_rating: newTotalRating });
    } else if (status === 0) {
        const newNumberRating = course.number_rating;
        const newTotalRating = course.total_rating + entity.rating - oldEntity.rating;
        const newRating = Math.round(newTotalRating / newNumberRating * 100) / 100;

        return await course.update({ rating: newRating, total_rating: newTotalRating });
    } else {
        const newNumberRating = course.number_rating - 1;
        const newTotalRating = course.total_rating - entity.rating;
        const newRating = Math.round(newTotalRating / newNumberRating * 100) / 100;

        return await course.update({ rating: newRating, number_rating: newNumberRating, total_rating: newTotalRating });
    }


}

exports.updateEnrolled = async function (course) {
    const newNumberEnroll = course.number_enrolled + 1
    await course.update({ number_enrolled: newNumberEnroll })
}

exports.getListHighlightCourses = async function () {
    return await Courses.findAll({
        where: {
            createdAt: {
                [Op.gt]: Date.now() - 7 * 24 * 3600 * 1000
            }
        },
        limit: LIMIT,
        order: [['rating', 'DESC']],
    });
}

exports.getListMostViewsCourses = async function () {
    const result = await db.sequelize.query(
        `select c.* 
        from watch_lists as w 
        inner join 
        courses as c 
        on w.courseId = c.id 
        group by courseId 
        order by count(w.courseId) desc 
        limit 4`,
        QueryTypes.SELECT
    );
    return result[0];
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

exports.GetListEnrolledCourses = async function(userId, page, limit){
    const result = await db.sequelize.query(
        `select c.* 
        from enroll_lists as e
        inner join 
        courses as c 
        on e.courseId = c.id 
        where e.createdBy = ${userId}
        order by e.createdAt desc
        limit ${limit}
        offset ${(page - 1)*limit}`,
        QueryTypes.SELECT
    );
    const total = await EnrollList.findAndCountAll({
        where:{
            createdBy: userId
        }
    });
    const totalPage = Math.ceil(total.count / limit);
    return {result: result[0], totalPage: totalPage};
}

exports.GetListMostEnrollInWeek = async function(){
    const result = await db.sequelize.query(
        `select c.* 
        from enroll_lists as e
        inner join courses as c 
        on e.courseId = c.id 
        where e.courseId = c.id and e.createdAt > ${Date.now() - 7 * 24 * 3600 * 1000}
        group by e.courseId
        order by count(e.id) desc
        limit ${LIMIT}`
    );
    return result;
}