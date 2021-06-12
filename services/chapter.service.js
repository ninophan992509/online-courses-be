const { ErrorHandler } = require('../exceptions/error');
const db = require('../models');
const Chapter = require('../models/chapter')(db.sequelize, db.Sequelize.DataTypes);
const STATUS = require('../enums/status.enum');

exports.FindOne = async function(id){
    return await Chapter.FindOne(id);
}