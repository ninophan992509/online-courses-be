const db = require('../models');
const Lessons = require('../models/lesson')(db.sequelize, db.Sequelize.DataTypes);
const Videos = require('../models/video')(db.sequelize, db.Sequelize.DataTypes);
const Documents = require('../models/document')(db.sequelize, db.Sequelize.DataTypes);
const STATUS = require('../enums/status.enum');
const { QueryTypes } = require('sequelize');
const courseService = require('./course.service');
const models = require('../models');
Lessons.associate(models);

/**
 * 
 * @param whereObject ex: { categoryId: 1, status: STATUS.active }
 * @returns 1 category entity
 */
exports.findOne = async function (whereObject) {
    return await Lessons.findOne({
        where: whereObject,
        include:[
            {
                model: Videos,
                required: false
            },
            {
                model: Documents,
                required: false
            }
        ]
    });
}

exports.findAll = async function (page, limit, chapterId) {
    return await Lessons.findAndCountAll({
        where: {chapterId: chapterId},
        limit,
        offset: (page - 1) * limit,
    });
}

exports.create = async function (entity) {
    return await Lessons.create(entity)
}

exports.update = async function (dbEntity, updateEntity) {
    return await dbEntity.update(updateEntity);
}
