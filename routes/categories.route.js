const express = require('express');
const router = express.Router();
const catSchema = require('../schemas/category.json');
const catService = require('../services/category.service');
const courseService = require('../services/course.service');
const { ErrorHandler } = require('../exceptions/error');
const { getPutSchema } = require('../utils');
const STATUS = require('../enums/status.enum');
const USER_TYPE = require('../enums/user-type.enum');

router.post('/',
    require('../middlewares/auth.mdw'),
    require('../middlewares/auth.roles.mdw')([USER_TYPE.admin]),
    require('../middlewares/validate.mdw')(catSchema),
    async function (req, res, next) {
        try {
            const payload = req.accessTokenPayload;
            const entity = req.body;
            entity.created_by = payload.userId;
            entity.status = STATUS.active;
            const result = await catService.Create(entity);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }
);

router.get('/', async function (req, res, next) {
    try {
        const result = await catService.findAll();
        res.status(result.rows.length !== 0 ? 200 : 204).json(result);
    } catch (error) {
        next(error);
    }
});

router.put('/',
    require('../middlewares/auth.mdw'),
    require('../middlewares/auth.roles.mdw')([USER_TYPE.admin]),
    require('../middlewares/validate.mdw')(getPutSchema(catSchema)),
    async function (req, res, next) {
        try {
            const payload = req.accessTokenPayload;
            const currentUser = { userId: payload.userId };

            const entity = req.body;
            const id = entity.id;

            const dbEntity = await catService.findOne({ id, status: STATUS.active });
            if (!dbEntity) {
                throw new ErrorHandler(404, "Not exist entity");
            }
            const result = await catService.update(dbEntity, {
                category_name: entity.category_name,
                updated_by: currentUser.userId
            });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    require('../middlewares/auth.mdw'),
    require('../middlewares/auth.roles.mdw')([USER_TYPE.admin]),
    async function (req, res, next) {
        try {
            const payload = req.accessTokenPayload;
            const currentUser = { userId: payload.userId };

            const id = parseInt(req.params.id);

            const existCourse = await courseService.findOne({
                category_id: id,
                status: STATUS.active
            });
            if (existCourse !== null) {
                throw new ErrorHandler(404, "Course existed");
            }

            const dbEntity = await catService.findOne({ id, status: STATUS.active });
            if (dbEntity === null) {
                throw new ErrorHandler(404, "Category is not existed.");
            }

            const result = await catService.update(dbEntity, {
                status: STATUS.deleted,
                updated_by: currentUser.userId
            });
            res.status(204).json(null);
        } catch (error) {
            next(error);
        }
    });

module.exports = router;