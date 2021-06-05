const express = require('express');
const router = express.Router();
const enrollListsService = require('../services/enroll-list.service');
const { ErrorHandler } = require('../exceptions/error');
const STATUS = require('../enums/status.enum');
const USER_TYPE = require('../enums/user-type.enum');
const { getPutSchema } = require('../utils');
const EnrollSchema = require('../schemas/enroll-course.json');

router.post('/',
    require('../middlewares/validate.mdw')(EnrollSchema),
     async function (req,res,next){
    try{
        let userId = req.accessTokenPayload.userId;
        const result = await enrollListsService.EnrollCourses(req.body.courseId, userId);
        res.status(200).json(result);
    }catch(error){
        next(error);
    }
})

module.exports = router;