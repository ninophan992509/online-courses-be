const express = require('express');
const router = express.Router();
const chapterService = require('../services/chapter.service');
const videoService = require('../services/video.service');
const { Response, PageResponse } = require('../response/response');
const { ErrorHandler } = require('../exceptions/error');
const STATUS = require('../enums/status.enum');
const USER_TYPE = require('../enums/user-type.enum');
const validateAuth = require('../middlewares/auth.mdw');
const validateSchema = require('../middlewares/validate.mdw');
const validateRole = require('../middlewares/auth.roles.mdw');
const VideoSchema = require('../schemas/post-video.json');

router.get('/by-chapterId/:chapterId', async function (req,res,next){
    try{
        let { chapterId } = req.params;
        id = parseInt(chapterId);
        if (isNaN(chapterId) || chapterId < 0) {
            throw new ErrorHandler(400, "chapterId NaN.");
        }
        const result = await videoService.FindVideosByChapterId(chapterId);
        res.status(200).json(new Response(null,true,result));
    }catch(error){
        next(error);
    }
});

router.post('/', validateRole([USER_TYPE.teacher, USER_TYPE.admin]), validateSchema(VideoSchema), async function (req,res,next){
    try{
        let video = req.body;
        video.createdBy = req.accessTokenPayload.userId;
        const result = await videoService.PostVideosByChapterId(video);
        res.status(200).json(new Response(null,true,result));
    }catch(error){
        next(error);
    }
});

module.exports = router;