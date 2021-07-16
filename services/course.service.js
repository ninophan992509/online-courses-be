const db = require('../models');
const Courses = require('../models/course')(db.sequelize, db.Sequelize.DataTypes);
const Chapters = require('../models/chapter')(db.sequelize, db.Sequelize.DataTypes);
const EnrollList = require('../models/enroll_list')(db.sequelize, db.Sequelize.DataTypes);
const WatchList = require('../models/watch_list')(db.sequelize, db.Sequelize.DataTypes);
const Users = require('../models/user')(db.sequelize, db.Sequelize.DataTypes);
const STATUS = require('../enums/status.enum');
const { Op, QueryTypes, where } = require('sequelize');
const category = require('../models/category')(db.sequelize, db.Sequelize.DataTypes);
const storage = require('./storage.service');
const LIMIT = 10;
const OFFSET = 0;
const models = require('../models');
const course = require('../models/course');
Courses.associate(models);

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
    let result = await Courses.findOne({
        where: {
            ...whereObject, status: {
                [Op.or]: [STATUS.active, STATUS.notDone]
            }
        },
        include: [
            {
                model: category,
                required: false,
                attributes: ['category_name']
            },
            {
                model: Users,
                required: false,
                attributes: ['fullname']
            }
        ]
    });
    result.total_view += 1;
    await result.save();
    result.dataValues.category_name = result.category.category_name
    delete result.dataValues.category;
    result.dataValues.teacher_name = result.user.fullname;
    delete result.dataValues.user;
    return result;
}

exports.findOneWithListChapters = async function (whereObject) {
    return await Courses.findOne({
        where: {
            ...whereObject
        },
        include: [
            {
                model: Chapters,
                required: false
            }
        ]
    });
}

exports.findNewest = async function () {
    let result = await Courses.findAll({
        where: {
            status: { [Op.or]: [STATUS.active, STATUS.notDone] }
        },
        order: [
            ['createdAt', 'DESC']
        ],
        limit: LIMIT,
        offset: OFFSET,
        include: [
            {
                model: category,
                required: false,
                attributes: ['category_name']
            },
            {
                model: Users,
                required: false,
                attributes: ['fullname']
            }
        ]
    });
    await result.forEach(r => {
        r.dataValues.category_name = r.category.category_name
        delete r.dataValues.category;
        r.dataValues.teacher_name = r.user.fullname;
        delete r.dataValues.user;
    });
    return result;
}

exports.findMostEnrolled = async function () {
    let result = await Courses.findAll({
        where: {
            status: { [Op.or]: [STATUS.active, STATUS.notDone] }
        },
        order: [
            ['number_enrolled', 'DESC']
        ],
        limit: LIMIT,
        offset: OFFSET,
        include: [
            {
                model: category,
                required: false,
                attributes: ['category_name'],
            },
            {
                model: Users,
                required: false,
                attributes: ['fullname'],
            }
        ]
    });
    await result.forEach(r => {
        r.dataValues.category_name = r.category.category_name
        delete r.dataValues.category;
        r.dataValues.teacher_name = r.user.fullname;
        delete r.dataValues.user;
    });
    return result;
}

exports.findAll = async function (page, limit, lstCategoryId, teacherId, sort) {
    let whereObj = { status: { [Op.or]: [STATUS.active, STATUS.notDone] } };
    if (lstCategoryId.length > 0) {
        whereObj.categoryId = { [Op.or]: lstCategoryId };
    }
    if (teacherId) {
        whereObj.teacherId = teacherId;
    }
    let orderObj = [];
    if (sort != undefined){
        if (sort == "rating"){
            orderObj = [['rating', 'DESC']];
        }else{
            orderObj = [['tuition_fee']];
        }
    }
    
    const result = await Courses.findAndCountAll({
        where: whereObj,
        limit,
        offset: (page - 1) * limit,
        include: [
            {
                model: category,
                required: false,
                attributes: ['category_name'],
                as: 'category'
            },
            {
                model: Users,
                required: false,
                attributes: ['fullname'],
            }
        ],
        order: orderObj
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

    extraData[0].forEach(x => { check.isNew.add(x.id); });
    extraData[1].forEach(x => { check.isMostEnrolled.add(x.id); });
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

    await result.rows.forEach(r => {
        r.dataValues.category_name = r.category.category_name
        delete r.dataValues.category;
        r.dataValues.teacher_name = r.user.fullname;
        delete r.dataValues.user;
    });

    return result;
}

exports.findAllWithPrivateCourses = async function (page, limit, lstCategoryId, teacherId, sort) {
    let whereObj = {};
    if (lstCategoryId.length > 0) {
        whereObj.categoryId = { [Op.or]: lstCategoryId };
    }
    whereObj.teacherId = teacherId;
    let orderObj = [];
    if (sort != undefined){
        if (sort == "rating"){
            orderObj = [['rating', 'DESC']];
        }else{
            orderObj = [['tuition_fee']];
        }
    }
    
    const result = await Courses.findAndCountAll({
        where: whereObj,
        limit,
        offset: (page - 1) * limit,
        include: [
            {
                model: category,
                required: false,
                attributes: ['category_name'],
                as: 'category'
            },
            {
                model: Users,
                required: false,
                attributes: ['fullname'],
            }
        ],
        order: orderObj
    });

    await result.rows.forEach(r => {
        r.dataValues.category_name = r.category.category_name
        delete r.dataValues.category;
        r.dataValues.teacher_name = r.user.fullname;
        delete r.dataValues.user;
    });

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
    course.total_view = 0;
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
    let result = await Courses.findAll({
        where: {
            createdAt: {
                [Op.gt]: Date.now() - 30 * 24 * 3600 * 1000
            }
        },
        limit: LIMIT,
        order: [['rating', 'DESC']],
        include: [
            {
                model: category,
                required: false,
                attributes: ['id', 'category_name']
            },
            {
                model: Users,
                required: false,
                attributes: ['id', 'fullname']
            }
        ]
    });

    await result.forEach(r => {
        r.dataValues.category_name = r.category.category_name
        delete r.dataValues.category;
        r.dataValues.teacher_name = r.user.fullname;
        delete r.dataValues.user;
    });
    return result;
}

exports.getListMostViewsCourses = async function () {
    const result = await Courses.findAll({
        where: {
            status: {
                [Op.or]: [STATUS.active, STATUS.notDone]
            }
        },
        order: [
            ['total_view', 'DESC']
        ],
        limit: LIMIT,
        include: [
            {
                model: category,
                required: false,
                attributes: ['category_name']
            },
            {
                model: Users,
                required: false,
                attributes: ['fullname']
            }
        ]
    });
    await result.forEach(r => {
        r.dataValues.category_name = r.category.category_name
        delete r.dataValues.category;
        r.dataValues.teacher_name = r.user.fullname;
        delete r.dataValues.user;
    });

    return result;
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

exports.GetListEnrolledCourses = async function (userId, page, limit) {
    const count = await db.sequelize.query(`
    select count(*) as count
    from enroll_lists where createdBy = ${userId}`,
    QueryTypes.SELECT);

    const result = await db.sequelize.query(
        `select c.*, category.category_name as category_name,teacher.fullname as teacher_name
        from enroll_lists as e
        inner join 
        courses as c 
        on e.courseId = c.id
        inner join
		categories as category
        on c.categoryId = category.id
        inner join
        users as teacher
        on c.teacherId = teacher.id
        where e.createdBy = ${userId}
        order by e.createdAt desc
        limit ${limit}
        offset ${(page - 1) * limit}`,
        QueryTypes.SELECT
    );
    return {count: count[0][0].count, rows: result[0]};
}

exports.GetListMostEnrollInWeek = async function () {
    const result = await db.sequelize.query(
        `select c.*, category.category_name as category_name,teacher.fullname as teacher_name
        from enroll_lists as e
        inner join courses as c 
        on e.courseId = c.id 
        inner join
		categories as category
        on c.categoryId = category.id
        inner join
        users as teacher
        on c.teacherId = teacher.id
        where e.courseId = c.id and e.createdAt > ${Date.now() - 7 * 24 * 3600 * 1000}
        group by e.courseId
        order by count(e.id) desc
        limit ${LIMIT}`
    );
    return result;
}

exports.SearchCoursePaged = async function(page, limit, query){
    const count = await db.sequelize.query(
        `select count(*) as count
        from courses
        where match (course_name, description, short_description) against ('${query}' in natural language mode)`);

    const result = await db.sequelize.query(
        `select c.*,category.category_name as category_name,teacher.fullname as teacher_name
        from courses as c
        inner join
		categories as category
        on c.categoryId = category.id
        inner join
        users as teacher
        on c.teacherId = teacher.id
        where match (course_name, description, short_description) against ('${query}' in natural language mode)
        limit ${limit}
        offset ${(page - 1) * limit}`
    );
    return {count: count[0][0].count, rows: result[0]}
}

exports.GetSelfWatchList = async function(userId, page, limit)
{
    const count = await db.sequelize.query(
        `select count(*) as count
            from watch_lists
            where createdBy = ${userId}`
    );

    const result = await db.sequelize.query(
        `SELECT c.*, category.category_name as category_name,teacher.fullname as teacher_name
        FROM watch_lists w
        inner join courses c
        on w.courseId = c.Id
        inner join
        categories as category
        on c.categoryId = category.id
        inner join
        users as teacher
        on c.teacherId = teacher.id
        where w.createdBy = ${userId}
        order by w.createdAt desc
        limit ${limit}
        offset ${(page-1)*limit}`
    );

    return {count: count[0][0].count, rows: result[0]};
}

exports.GetRelativeCourse = async function(courseId)
{
    const course = await Courses.findOne({where:{Id: courseId}});
    const categoryId = course.dataValues.categoryId;

    const result = await db.sequelize.query(
        `SELECT course.*,category.category_name as category_name,teacher.fullname as teacher_name
            FROM enroll_lists enroll
            inner join courses course
            on enroll.courseId = course.Id
            inner join
            categories as category
            on course.categoryId = category.id
            inner join
            users as teacher
            on course.teacherId = teacher.id
            where course.categoryId = ${categoryId} and course.Id <> ${courseId}
            group by course.Id
            order by count(course.Id)
            limit 5`
    );
    return result[0];
}

exports.AddCourseToWatchList = async function(courseId, userId){
    let watchList = {courseId:courseId, status: 1, createdBy: userId, updatedBy: userId};
    await WatchList.create(watchList);
}

exports.RemoveCourseFromWatchList = async function(courseId, userId){
    let watchlist = await WatchList.findOne({
        where: {
            courseId: courseId,
            createdBy: userId
        }
    });
    await watchlist.destroy();
}