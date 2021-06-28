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

exports.findAll = async function (whereObject) {
    return await Documents.findAll({
        where: whereObject
    });
}

exports.create = async function (entity) {
    return await Documents.create(entity)
}

exports.update = async function (dbEntity, updateEntity) {
    return await dbEntity.update(updateEntity);
}
