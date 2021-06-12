const { ErrorHandler } = require('../exceptions/error');
const db = require('../models');
const EnrollList = require('../models/enroll_list')(db.sequelize, db.Sequelize.DataTypes);
const STATUS = require('../enums/status.enum');

exports.GetEnrollCourseInfo = async function(courseId, userId){
    const result = await EnrollList.findOne({
        where:{
            courseId: courseId,
            createdBy: userId
        }
    });
    return result;
}

exports.EnrollCourses = async function(courseId, userId){
    const checkExist = await EnrollList.findOne({
        where:{
            courseId: courseId,
            createdBy: userId
        }
    });
    if (checkExist != null) throw new ErrorHandler(400, "User enrolled on this course");
    const enroll = {watching: 0, done: "[]", status: STATUS.active, courseId: courseId, createdBy: userId};
    const result = await EnrollList.create(enroll);
    return result;
}

exports.UpdateEnrollCourseInfo = async function(enroll){
    const entity = await EnrollList.findOne({
        where:{
            courseId: enroll.courseId,
            createdBy: enroll.createdBy
        }
    });
    if (enroll.watching != null) entity.watching = enroll.watching;
    if (enroll.done != null) entity.done = enroll.done;
    if (enroll.status != null) entity.status = enroll.status;
    await entity.save();
    return entity;
}