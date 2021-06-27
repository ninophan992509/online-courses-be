const db = require('../models');
const Feedbacks = require('../models/feedback')(db.sequelize, db.Sequelize.DataTypes);
const Users = require('../models/user')(db.sequelize, db.Sequelize.DataTypes);
const STATUS = require('../enums/status.enum');
const { QueryTypes } = require('sequelize');
const courseService = require('./course.service');

Feedbacks.belongsTo(Users, { foreignKey: 'createdBy' });
Users.hasMany(Feedbacks, { foreignKey: 'id' });

/**
 * 
 * @param whereObject ex: { categoryId: 1, status: STATUS.active }
 * @returns 1 category entity
 */
exports.findOne = async function (whereObject) {
    return await Feedbacks.findOne({
        where: whereObject,
        include: {
            model: Users,
            required: false,
            attributes: ['fullname']
        },
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
        include: {
            model: Users,
            required: false,
            attributes: ['fullname']
        },
    });
}


exports.create = async function (entity) {
    return await Feedbacks.create(entity)
}

exports.update = async function (dbEntity, updateEntity) {
    return await dbEntity.update(updateEntity);
}
