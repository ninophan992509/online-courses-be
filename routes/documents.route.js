const express = require('express');
const router = express.Router();
const documentSchema = require('../schemas/document.json');
const documentService = require('../services/document.service');
const chapterService = require('../services/chapter.service');
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
    validateSchema(documentSchema),
    async function (req, res, next) {
        try {
            const payload = req.accessTokenPayload;
            const currentUser = { userId: payload.userId };
            const entity = req.body;

            entity.createdBy = payload.userId;
            entity.status = STATUS.active;

            const checkChapter = await chapterService.findOne({ id: entity.chapterId, status: STATUS.active })
            if (checkChapter === null) {
                throw new ErrorHandler(404, "Chapter is not existed.");
            }

            if (payload.type !== USER_TYPE.admin &&
                (payload.type !== USER_TYPE.teacher || currentUser.userId !== checkChapter.createdBy)) {
                throw new ErrorHandler(403, "Permission denied.");
            }

            const result = await documentService.create(entity);
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
            let { page, limit, chapterId } = req.query;
            page = getPageQuery(page);
            limit = getLimitQuery(limit);
            chapterId = parseInt(chapterId);
            if (isNaN(chapterId) || chapterId < 1) {
                throw new ErrorHandler(400, "Invalid chapterId.");
            }
            const checkChapter = await chapterService.findOne({ id: chapterId, status: STATUS.active })
            if (checkChapter === null) {
                throw new ErrorHandler(404, "Chapter is not existed.");
            }
            const result = await documentService.findAll(page, limit, chapterId);
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
        const result = await documentService.findOne({ id, status: STATUS.active });
        res.status(200).json(new Response(null, true, result));
    } catch (ex) {
        next(ex);
    }
});


router.put('/',
    validateAuth,
    validateRoles([USER_TYPE.admin, USER_TYPE.teacher]),
    validateSchema(getPutSchema(documentSchema)),
    async function (req, res, next) {
        try {
            const payload = req.accessTokenPayload;
            const currentUser = { userId: payload.userId };

            const entity = req.body;
            const id = entity.id;

            const dbEntity = await documentService.findOne({ id, status: STATUS.active });

            if (!dbEntity) {
                throw new ErrorHandler(404, "Document is not existed.");
            }

            if (payload.type !== USER_TYPE.admin &&
                (payload.type !== USER_TYPE.teacher || currentUser.userId !== dbEntity.createdBy)) {
                throw new ErrorHandler(403, "Permission denied.");
            }

            if (entity.chapterId) {
                const checkChapter = await chapterService.findOne({ id: entity.chapterId, status: STATUS.active });
                if (checkChapter === null) {
                    throw new ErrorHandler(404, "Chapter is not existed.");
                }
            }

            const newEntity = { ...entity, updatedBy: currentUser.userId };
            const result = await documentService.update(dbEntity, newEntity);
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

            if (payload.type !== USER_TYPE.admin &&
                (payload.type !== USER_TYPE.teacher || currentUser.userId !== dbEntity.teacherId)) {
                throw new ErrorHandler(403, "Permission denied.");
            }

            const dbEntity = await documentService.findOne({ id, status: STATUS.active });

            if (dbEntity === null) {
                throw new ErrorHandler(404, "Chapter is not existed.");
            }

            await documentService.update(dbEntity, { updatedBy: currentUser.userId, status: STATUS.deleted });
            res.status(200).json(new Response(null, true, null));
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;