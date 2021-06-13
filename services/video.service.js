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