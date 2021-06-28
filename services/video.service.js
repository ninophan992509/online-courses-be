const { ErrorHandler } = require('../exceptions/error');
const db = require('../models');
const Videos = require('../models/video')(db.sequelize, db.Sequelize.DataTypes);
const STATUS = require('../enums/status.enum');

exports.FindVideosByChapterId = async function(chapterId){
    var result = await Videos.findAll({
        where:{
            chapterId: chapterId
        }
    });
    return result;
}
exports.PostVideosByChapterId = async function(video){
    video.status = STATUS.active;
    var result = await Videos.create(video);
    return result;
}

exports.findOne = async function (whereObject) {
    return await Videos.findOne({
        where: whereObject
    });
}

exports.findAll = async function (whereObject) {
    return await Videos.findAll({
        where: whereObject
    });
}

exports.create = async function (entity) {
    return await Videos.create(entity)
}

exports.update = async function (dbEntity, updateEntity) {
    return await dbEntity.update(updateEntity);
}