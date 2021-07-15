const express = require('express');
const router = express.Router();
const LessonService = require('../services/lesson.service');
const VideoService = require('../services/video.service');
const DocumentService = require('../services/document.service');
const Response = require('../response/response').Response;
const AuthMdw = require('../middlewares/auth.mdw');
const AuthRoleMdw = require('../middlewares/auth.roles.mdw');
const USER_TYPE = require('../enums/user-type.enum');
const LessonSchema = require('../schemas/lesson.json');
const ValidateMdw = require('../middlewares/validate.mdw');


router.get('/:id', AuthMdw, async function (req, res, next) {
    try {
        let { id } = req.params;
        id = parseInt(id);
        if (isNaN(id) || id < 1) {
            throw new ErrorHandler(400, "Invalid Id.");
        }
        var result = await LessonService.findOne({ id: id });
        res.status(200).json(new Response(null, true, result));
    } catch (error) {
        next(error);
    }
});

router.post('', AuthMdw, AuthRoleMdw([USER_TYPE.teacher]), ValidateMdw(LessonSchema), async function (req, res, next) {
    try {
        let userId = req.accessTokenPayload.userId;
        var lesson = req.body;
        lesson.createdBy = userId;
        lesson.updatedBy = userId;
        var result = await LessonService.create(lesson);
        res.status(200).json(new Response(null, true, result));
    } catch (error) {
        next(error);
    }
});

router.put('/:id', AuthMdw, AuthRoleMdw([USER_TYPE.teacher]), ValidateMdw(LessonSchema), async function (req, res, next) {
    try {
        let { id } = req.params;
        id = parseInt(id);
        if (isNaN(id) || id < 1) {
            throw new ErrorHandler(400, "Invalid Id.");
        }
        var entity = await LessonService.findOne({ id: id });
        var updateEntity = req.body;
        updateEntity.id = id;
        var result = await LessonService.update(entity, updateEntity);
        res.status(200).json(new Response(null, true, result));
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', AuthMdw, AuthRoleMdw([USER_TYPE.teacher, USER_TYPE.admin]), AuthRoleMdw([USER_TYPE.teacher]), async function (req, res, next) {
    try {
        let { id } = req.params;
        id = parseInt(id);
        if (isNaN(id) || id < 1) {
            throw new ErrorHandler(400, "Invalid Id.");
        }
        var entity = await LessonService.findOne({ id: id });
        await entity.destroy();
        res.status(200).json(new Response(null, true, null));
    } catch (error) {
        next(error);
    }
});

module.exports = router;