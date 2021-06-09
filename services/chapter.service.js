const db = require('../models');
const Chapters = require('../models/chapter')(db.sequelize, db.Sequelize.DataTypes);
const Documents = require('../models/document')(db.sequelize, db.Sequelize.DataTypes);
const Videos = require('../models/video')(db.sequelize, db.Sequelize.DataTypes);
const STATUS = require('../enums/status.enum');
const { QueryTypes } = require('sequelize');
const courseService = require('./course.service');

Chapters.hasMany(Documents, { foreignKey: 'chapterId' });
Chapters.hasMany(Videos, { foreignKey: 'chapterId' });
Documents.belongsTo(Chapters, { foreignKey: 'chapterId' });
Videos.belongsTo(Chapters, { foreignKey: 'chapterId' });

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

exports.findAll = async function (page, limit, courseId) {
    const whereObj = { status: STATUS.active }
    if (courseId) {
        whereObj.courseId = courseId;
    }
    return await Chapters.findAndCountAll({
        where: whereObj,
        limit,
        offset: (page - 1) * limit,
        order: [['createdAt', 'ASC']],
        include: [
            {
                model: Documents,
                where: {
                    status: STATUS.active
                },
                required: false
            },
            {
                model: Videos,
                where: {
                    status: STATUS.active
                },
                required: false
            }
        ]
    });
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
                model: Documents,
                where: {
                    status: STATUS.active
                },
                required: false
            },
            {
                model: Videos,
                where: {
                    status: STATUS.active
                },
                required: false
            }
        ]
    });
}
