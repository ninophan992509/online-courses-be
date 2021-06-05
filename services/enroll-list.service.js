const { ErrorHandler } = require('../exceptions/error');
const db = require('../models');
const EnrollList = require('../models/enroll_list')(db.sequelize, db.Sequelize.DataTypes);
const STATUS = require('../enums/status.enum');
const Response = require('../response/response').Response;

exports.EnrollCourses = async function(courseId, userId){
    const enroll = {watching: 0, done: "[]", status: STATUS.active, courseId: courseId, createdBy: userId};
    const result = await EnrollList.create(enroll);
    return new Response(null,true,result);
}