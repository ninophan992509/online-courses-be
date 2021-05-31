const { ErrorHandler } = require('../exceptions/error');
const db = require('../models');
const Courses = require('../models/course')(db.sequelize, db.Sequelize.DataTypes);
const Response = require('../response/response').Response;

/**
 * 
 * @param whereObject ex: { category_id: 1, status: STATUS.active }
 * @returns 1 category entity
 */
exports.findOne = async function (whereObject) {
    return await Courses.findOne({
        where: whereObject
    });
}
