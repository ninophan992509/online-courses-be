const db = require('../models');
const Documents = require('../models/document')(db.sequelize, db.Sequelize.DataTypes);
const STATUS = require('../enums/status.enum');
const { QueryTypes } = require('sequelize');

/**
 * 
 * @param whereObject ex: { categoryId: 1, status: STATUS.active }
 * @returns 1 category entity
 */
exports.findOne = async function (whereObject) {
    return await Documents.findOne({
        where: whereObject
    });
}

exports.findAll = async function (page, limit, chapterId) {
    const whereObj = { status: STATUS.active }
    if (chapterId) {
        whereObj.chapterId = chapterId;
    }
    return await Documents.findAndCountAll({
        where: whereObj,
        limit,
        offset: (page - 1) * limit,
    });
}

exports.create = async function (entity) {
    return await Documents.create(entity)
}

exports.update = async function (dbEntity, updateEntity) {
    return await dbEntity.update(updateEntity);
}
