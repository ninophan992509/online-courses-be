const express = require('express');
const router = express.Router();
const chapterSchema = require('../schemas/chapter.json');
const chapterService = require('../services/chapter.service');
const courseService = require('../services/course.service');
const { ErrorHandler } = require('../exceptions/error');
const { Response, PageResponse } = require('../response/response');
const STATUS = require('../enums/status.enum');
const USER_TYPE = require('../enums/user-type.enum');
const getQuerySchema = require('../schemas/getQuery');

const validateAuth = require('../middlewares/auth.mdw');
const validateRoles = require('../middlewares/auth.roles.mdw');
const validateGetQuery = require('../middlewares/validateGetQuery.mdw');
const validateSchema = require('../middlewares/validate.mdw');

const {
    getPutSchema,
    getLimitQuery,
    getPageQuery,
} = require('../utils');
const db = require('../models');

router.post('/',
    validateAuth,
    validateSchema(chapterSchema),
    async function (req, res, next) {
        try {
            const payload = req.accessTokenPayload;
            const currentUser = { userId: payload.userId };
            const entity = req.body;

            entity.createdBy = payload.userId;
            entity.status = STATUS.active;

            const checkCourse = await courseService.findOneNotDoneOrActive({ id: entity.courseId })
            if (checkCourse === null) {
                throw new ErrorHandler(404, "Course is not existed.");
            }

            if (payload.type !== USER_TYPE.admin &&
                (payload.type !== USER_TYPE.teacher || currentUser.userId !== checkCourse.teacherId)) {
                throw new ErrorHandler(403, "Permission denied.");
            }

            const result = await chapterService.create(entity);
            res.status(201).json(new Response(null, true, result));
        } catch (error) {
            next(error);
        }
    }
);

router.get('/',
    validateGetQuery(getQuerySchema),
    async function (req, res, next) {
        try {
            let { page, limit, courseId } = req.query;
            page = getPageQuery(page);
            limit = getLimitQuery(limit);
            courseId = parseInt(courseId);
            if (isNaN(courseId) || courseId < 1) {
                throw new ErrorHandler(400, "Invalid courseId.");
            }
            const checkCourse = await courseService.findOneNotDoneOrActive({ id: courseId })
            if (checkCourse === null) {
                throw new ErrorHandler(404, "Course is not existed.");
            }
            const result = await chapterService.findAll(page, limit, courseId);
            res.status(200).json(new PageResponse(null, true, result, page, limit));
        } catch (error) {
            next(error);
        }
    }
);

// get all document and video
router.get('/:id', async function (req, res, next) {
    try {
        let { id } = req.params;
        id = parseInt(id);
        if (isNaN(id) || id < 1) {
            throw new ErrorHandler(400, "Invalid Id.")
        }
        const result = await chapterService.findRelated({ id, status: STATUS.active });
        res.status(200).json(new Response(null, true, result));
    } catch (ex) {
        next(ex);
    }
});


router.put('/',
    require('../middlewares/auth.mdw'),
    require('../middlewares/auth.roles.mdw')([USER_TYPE.admin, USER_TYPE.teacher]),
    require('../middlewares/validate.mdw')(getPutSchema(chapterSchema)),
    async function (req, res, next) {
        try {
            const payload = req.accessTokenPayload;
            const currentUser = { userId: payload.userId };

            const entity = req.body;

            const dbEntity = await chapterService.findOne({ id: entity.id, status: STATUS.active });

            if (!dbEntity) {
                throw new ErrorHandler(404, "Chapter is not existed.");
            }

            if (payload.type !== USER_TYPE.admin &&
                (payload.type !== USER_TYPE.teacher || currentUser.userId !== dbEntity.teacherId)) {
                throw new ErrorHandler(403, "Permission denied.");
            }

            if (entity.courseId && entity.courseId !== dbEntity.courseId) {
                throw new ErrorHandler(400, "Can not change courseId.");
            }

            const newEntity = { ...entity, updatedBy: currentUser.userId };
            const result = await chapterService.update(dbEntity, newEntity);
            res.status(200).json(new Response(null, true, result));
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validateAuth,
    validateRoles([USER_TYPE.admin, USER_TYPE.teacher]),
    async function (req, res, next) {
        try {
            const payload = req.accessTokenPayload;
            const currentUser = { userId: payload.userId };

            const id = parseInt(req.params.id);

            if (isNaN(id) || id < 1) {
                throw new ErrorHandler(400, "Invalid Id.");
            }

            const dbEntity = await chapterService.findRelated({ id, status: STATUS.active });

            if (dbEntity === null) {
                throw new ErrorHandler(404, "Chapter is not existed.");
            }

            if (dbEntity.lessons.length > 0) {
                throw new ErrorHandler(404, "Remove ralated lessons first.");
            }

            if (payload.type !== USER_TYPE.admin &&
                (payload.type !== USER_TYPE.teacher || currentUser.userId !== dbEntity.teacherId)) {
                throw new ErrorHandler(403, "Permission denied.");
            }

            //kiểm tra nếu còn document hoặc videos thuộc chapter này => ko xóa
            chapterService.update(dbEntity, { updatedBy: currentUser.userId, status: STATUS.deleted });
            res.status(200).json(new Response(null, true, null));
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;