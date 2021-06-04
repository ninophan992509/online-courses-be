const express = require('express');
const router = express.Router();
const feedbackSchema = require('../schemas/feedback.json');
const catService = require('../services/category.service');
const courseService = require('../services/course.service');
const feedbackService = require('../services/feedback.service');
const { ErrorHandler } = require('../exceptions/error');
const { Response, PageResponse } = require('../response/response');
const STATUS = require('../enums/status.enum');
const USER_TYPE = require('../enums/user-type.enum');
const {
    getPutSchema,
    getLimitQuery,
    getPageQuery,
    getCategoryQuery,
} = require('../utils');

router.post('/',
    require('../middlewares/auth.mdw'),
    require('../middlewares/auth.roles.mdw')([USER_TYPE.admin, USER_TYPE.teacher, USER_TYPE.student]),
    require('../middlewares/validate.mdw')(feedbackSchema),
    async function (req, res, next) {
        try {
            const payload = req.accessTokenPayload;
            const entity = req.body;
            entity.created_by = payload.userId;
            entity.status = STATUS.active;

            // TODO: check ENROLLed

            const checkCourse = await courseService.findOne({ id: entity.course_id, status: STATUS.active })
            if (checkCourse === null) {
                res.status(404).json({ message: "Course is not existed." });
                return;
            }
            const result = await feedbackService.create(entity);
            res.status(201).json(new Response(null, true, result));
        } catch (error) {
            next(error);
        }
    }
);

router.get('/', async function (req, res, next) {
    try {
        let { page, limit, course_id } = req.query;
        page = getPageQuery(page);
        limit = getLimitQuery(limit);
        course_id = getCategoryQuery(course_id);
        const result = await feedbackService.findAll(page, limit, course_id);
        res.status(result.rows.length !== 0 ? 200 : 204).json(new Response(null, true, result));
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        let { id } = req.params;
        id = parseInt(id);
        if (isNaN(id) || id < 0) {
            throw new ErrorHandler(400, "Id NaN.")
        }
        const result = await feedbackService.findOne({ id });
        res.status(result !== null ? 200 : 204).json(new Response(null, true, result));
    } catch (ex) {
        next(ex);
    }
});



router.put('/',
    require('../middlewares/auth.mdw'),
    require('../middlewares/auth.roles.mdw')([USER_TYPE.admin, USER_TYPE.teacher]),
    require('../middlewares/validate.mdw')(getPutSchema(feedbackSchema)),
    async function (req, res, next) {
        try {
            const payload = req.accessTokenPayload;
            const currentUser = { userId: payload.userId };

            const entity = req.body;
            const id = entity.id;
            if (isNaN(id)) throw new ErrorHandler(400, "Id NaN.");
            if (id < 1) throw new ErrorHandler(400, "Invalid Id.");

            const dbEntity = await feedbackService.findOne({ id, status: STATUS.active });
            if (!dbEntity) {
                throw new ErrorHandler(404, "Course is not existed.");
            }

            const checkCourse = await courseService.findOne({ id: entity.course_id, status: STATUS.active })
            if (checkCourse === null) {
                throw new ErrorHandler(404, "Course is not existed.");
            }

            const newEntity = { ...entity, updated_by: currentUser.userId };
            const result = await feedbackService.update(dbEntity, newEntity);
            res.status(200).json(new Response(null, true, result));
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    require('../middlewares/auth.mdw'),
    require('../middlewares/auth.roles.mdw')([USER_TYPE.admin, USER_TYPE.teacher]),
    async function (req, res, next) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) throw new ErrorHandler(400, "Id NaN.");
            if (id < 1) throw new ErrorHandler(400, "Invalid Id.");

            const dbEntity = await courseService.findOne({ id, status: STATUS.active });
            if (dbEntity === null) {
                throw new ErrorHandler(400, "Feedback is not existed.");
            }

            const payload = req.accessTokenPayload;
            const currentUser = { userId: payload.userId };

            await courseService.update(dbEntity, {
                status: STATUS.deleted,
                updated_by: currentUser.userId
            });
            res.status(204).json(null);
        } catch (error) {
            next(error);
        }
    });

module.exports = router;