const db = require('../models');
const Chapters = require('../models/chapter')(db.sequelize, db.Sequelize.DataTypes);
const Documents = require('../models/document')(db.sequelize, db.Sequelize.DataTypes);
const Videos = require('../models/video')(db.sequelize, db.Sequelize.DataTypes);
const Lessons = require('../models/lesson')(db.sequelize, db.Sequelize.DataTypes);
const Courses = require('../models/course')(db.sequelize, db.Sequelize.DataTypes);
const STATUS = require('../enums/status.enum');
const courseService = require('./course.service');
const enrollCourse = require('./enroll-list.service');
const { Op, QueryTypes} = require('sequelize');

// Chapters.hasMany(Documents, { foreignKey: 'chapterId' });
// Chapters.hasMany(Videos, { foreignKey: 'chapterId' });
// Documents.belongsTo(Chapters, { foreignKey: 'chapterId' });
// Videos.belongsTo(Chapters, { foreignKey: 'chapterId' });

Lessons.associate(db);
Chapters.associate(db);
/**
 * 
 * @param whereObject ex: { categoryId: 1, status: STATUS.active }
 * @returns 1 category entity
 */
exports.findOne = async function (whereObject) {
    return await Chapters.findOne({
        where: whereObject
    });
}

exports.findAll = async function (page, limit, courseId, userId) {
    let whereObj = {
        status: STATUS.active
    };
    let permisson = false;
    
    const course = await courseService.findOne({id: courseId});
    if (course == null){
        return null;
    }
    if (course.teacherId != userId)
    {
        whereObj = {
             status: {
                [Op.or]: [STATUS.active, STATUS.notDone]
             }
        };
    }else{
        permisson = true;
    }
    try{
        await enrollCourse.GetEnrollCourseInfo(courseId, userId);
        permisson = true;
    }catch(e){}

    whereObj.courseId = courseId;

    let result = await Chapters.findAndCountAll({
        where: whereObj,
        order: [['createdAt', 'ASC']],
        limit: limit,
        offset: (page - 1) * limit,
        include: [
            {
                model: Lessons,
                required: false,
                include: [
                    {
                        model: Videos,
                        required: false
                    }
                ]
            }
        ]
    });

    let count = await Chapters.count({
        where: whereObj
    });
    result.count = count;

    if (!permisson){
        result.rows.forEach(async element => {
            if (element.is_previewed != 1){
                await element.lessons.forEach(lesson =>{
                    lesson.dataValues.video = null;
                })
            }
        });
    }

    return result;
}

exports.create = async function (entity) {
    return await Chapters.create(entity)
}

exports.update = async function (dbEntity, updateEntity) {
    return await dbEntity.update(updateEntity);
}

exports.findRelated = async function (whereObj) {
    return await Chapters.findOne({
        where: whereObj,
        include: [
            {
                model: Lessons,
                required: false
            },
            {
                model: Courses,
                require: true
            }
        ]
    });
}
