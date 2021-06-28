const express = require('express');
const router = express.Router();
const LessonService = require('../services/lesson.service');
const VideoService = require('../services/video.service');
const DocumentService = require('../services/document.service');
const Response = require('../response/response').Response;

router.get('/:id', async function (req,res,next){
    try{
        let { id } = req.params;
        id = parseInt(id);
        if (isNaN(id) || id < 1) {
            throw new ErrorHandler(400, "Invalid Id.");
        }
        var result = await LessonService.findOne({id: id});
        res.status(200).json(new Response(null, true, result));
    }catch(error){
        next(error);
    }
})

module.exports = router;