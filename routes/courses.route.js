const express = require('express');
const router = express.Router();
const courseSchema = require('../schemas/course.json');
const catService = require('../services/category.service');
const courseService = require('../services/course.service');
const { ErrorHandler } = require('../exceptions/error');
const STATUS = require('../enums/status.enum');
const USER_TYPE = require('../enums/user-type.enum');
const { getPutSchema } = require('../utils');

router.post('/',
    require('../middlewares/auth.mdw'),
    require('../middlewares/auth.roles.mdw')([USER_TYPE.admin, USER_TYPE.teacher]),
    require('../middlewares/validate.mdw')(courseSchema),
    async function (req, res, next) {
        try {
            const payload = req.accessTokenPayload;
            const entity = req.body;
            entity.created_by = payload.userId;
            entity.status = STATUS.active;
            const checkCategory = await catService.findOne({ id: entity.category_id, status: STATUS.active })
            if (checkCategory === null) {
                throw new ErrorHandler(404, "Category is not existed.");
            }
            const result = await courseService.create(entity);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/', async function (req, res, next) {
    try {
        const result = await courseService.findAll();
        res.status(result.length !== 0 ? 200 : 204).json(result);
    } catch (error) {
        next(error);
    }
});

router.put('/',
    require('../middlewares/auth.mdw'),
    require('../middlewares/auth.roles.mdw')([USER_TYPE.admin, USER_TYPE.teacher]),
    require('../middlewares/validate.mdw')(getPutSchema(courseSchema)),
    async function (req, res, next) {
        try {
            const payload = req.accessTokenPayload;
            const currentUser = { userId: payload.userId };

            const entity = req.body;
            const id = entity.id;

            const dbEntity = await courseService.findOne({ id, status: STATUS.active });
            if (!dbEntity) {
                throw new ErrorHandler(404, "Course is not existed.");
            }

            const checkCategory = await catService.findOne({ id: entity.category_id, status: STATUS.active })
            if (checkCategory === null) {
                throw new ErrorHandler(404, "Category is not existed.");
            }

            const newEntity = { ...entity, updated_by: currentUser.userId };
            const result = await courseService.update(dbEntity, newEntity);
            res.status(200).json(result);
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
            const payload = req.accessTokenPayload;
            const currentUser = { userId: payload.userId };

            const id = parseInt(req.params.id);

            const dbEntity = await courseService.findOne({ id, status: STATUS.active });
            if (dbEntity === null) {
                throw new ErrorHandler(400, "Course is not existed.");
            }

            await courseService.update(dbEntity, {
                status: STATUS.deleted,
                updated_by: currentUser.userId
            });
            res.status(204).json(null);
        } catch (error) {
            next(error);
        }
    });

router.get('/newest', async function (req, res, next) {
    try {
        const result = await courseService.findNewest();
        res.status(result.rows.length !== 0 ? 200 : 204).json(result);
    } catch (error) {
        next(error);
    }
});

router.get('/highlights', async function (req, res, next){
    try{
        const result = await courseService.getListHighlightCourses();
        res.status(200).json(result);
    }catch(error){
        next(error);
    }
})

module.exports = router;