const express = require('express');
const router = express.Router();
const feedbackSchema = require('../schemas/feedback.json');
const courseService = require('../services/course.service');
const feedbackService = require('../services/feedback.service');
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

router.post('/',
    validateAuth,
    validateSchema(feedbackSchema),
    async function (req, res, next) {
        try {
            const payload = req.accessTokenPayload;
            const entity = req.body;

            entity.createdBy = payload.userId;
            entity.status = STATUS.active;

            const checkCourse = await courseService.findOneNotDoneOrActive({ id: entity.courseId })
            if (checkCourse === null) {
                throw new ErrorHandler(404, "Course is not existed.");
            }

            // check enrolled to create feedback
            const checkEnroll = await courseService.checkEnrollCourse(entity.courseId, payload.userId);
            if (checkEnroll.isRegister === 0) {
                throw new ErrorHandler(400, "Enroll before feedback.");
            }

            const dbEntity = await feedbackService.findOne({
                createdBy: payload.userId,
                courseId: entity.courseId,
                status: STATUS.active
            });
            if (dbEntity) {
                throw new ErrorHandler(400, "One feedback per person per course.");
            }

            await courseService.updateRating(checkCourse, entity, 1);

            const result = await feedbackService.create(entity);
            const createdEntity = await feedbackService.findOne({ id: result.id });
            res.status(201).json(new Response(null, true, createdEntity));
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
            const result = await feedbackService.findAll(page, limit, courseId);
            res.status(200).json(new PageResponse(null, true, result, page, limit));
        } catch (error) {
            next(error);
        }
    }
);

router.get('/:id', async function (req, res, next) {
    try {
        let { id } = req.params;
        id = parseInt(id);
        if (isNaN(id) || id < 1) {
            throw new ErrorHandler(400, "Invalid Id.")
        }
        const result = await feedbackService.findOne({ id, status: STATUS.active });
        res.status(200).json(new Response(null, true, result));
    } catch (ex) {
        next(ex);
    }
});


router.put('/',
    validateAuth,
    validateSchema(getPutSchema(feedbackSchema)),
    async function (req, res, next) {
        try {
            const payload = req.accessTokenPayload;
            const currentUser = { userId: payload.userId };

            const entity = req.body;
            const id = entity.id;
            if (isNaN(id) || id < 1) throw new ErrorHandler(400, "Invalid Id.");

            const dbEntity = await feedbackService.findOne({ id, status: STATUS.active });
            if (!dbEntity) {
                throw new ErrorHandler(404, "Feedback is not existed.");
            }

            if (currentUser.userId !== dbEntity.createdBy) {
                throw new ErrorHandler(403, "Permission denied.");
            }

            if (entity.courseId && entity.courseId !== dbEntity.courseId) {
                throw new ErrorHandler(400, "Can not change courseId.");
            }

            const checkCourse = await courseService.findOneNotDoneOrActive({ id: dbEntity.courseId });
            const oldRating = dbEntity.rating;

            const newEntity = { ...entity, updatedBy: currentUser.userId };
            delete newEntity.courseId;
            const result = await feedbackService.update(dbEntity, newEntity);

            if (newEntity.rating) {
                courseService.updateRating(checkCourse, newEntity, 0, { rating: oldRating });
            }

            res.status(200).json(new Response(null, true, result));
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validateAuth,
    async function (req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id) || id < 1) throw new ErrorHandler(400, "Invalid Id.");

            const dbEntity = await feedbackService.findOne({ id, status: STATUS.active });
            if (dbEntity === null) {
                throw new ErrorHandler(400, "Feedback is not existed.");
            }

            const payload = req.accessTokenPayload;
            const currentUser = { userId: payload.userId };

            if (payload.type !== USER_TYPE.admin &&
                (currentUser.userId !== dbEntity.createdBy)) {
                throw new ErrorHandler(403, "Permission denied.");
            }

            const checkCourse = await courseService.findOneNotDoneOrActive({
                id: dbEntity.courseId
            });
            if (checkCourse === null) {
                throw new ErrorHandler(404, "Course is not existed.");
            }

            const oldRating = dbEntity.rating;
            await feedbackService.update(dbEntity, { status: STATUS.deleted, updatedBy: currentUser.userId });
            await courseService.updateRating(checkCourse, { rating: oldRating }, -1);

            res.status(200).json(new Response(null, true, null));
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;