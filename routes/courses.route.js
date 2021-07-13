const express = require('express');
const router = express.Router();
const courseSchema = require('../schemas/course.json');
const enrollListSchema = require('../schemas/enroll-course.json');
const getQuerySchema = require('../schemas/getQuery');
const categoryService = require('../services/category.service');
const enrollCourseSchema = require('../schemas/enroll-course.json');
const courseService = require('../services/course.service');
const feedbackService = require('../services/feedback.service');
const chapterService = require('../services/chapter.service');
const enrollListsService = require('../services/enroll-list.service');
const { Response, PageResponse } = require('../response/response');
const { ErrorHandler } = require('../exceptions/error');
const STATUS = require('../enums/status.enum');
const USER_TYPE = require('../enums/user-type.enum');
const {
    getPutSchema,
    getLimitQuery,
    getPageQuery,
} = require('../utils');
const AuthMdw = require('../middlewares/auth.mdw');
const ValidateMdw = require('../middlewares/validate.mdw');
const ValidateQuery = require('../middlewares/validateGetQuery.mdw');

router.post('/',
    require('../middlewares/auth.mdw'),
    require('../middlewares/auth.roles.mdw')([USER_TYPE.admin, USER_TYPE.teacher]),
    require('../middlewares/validate.mdw')(courseSchema),
    async function (req, res, next) {
        try {
            const payload = req.accessTokenPayload;
            const entity = req.body;

            if (entity.sale && entity.sale > entity.tuition_fee) {
                throw new ErrorHandler(400, "Sale is not invalid.");
            }

            entity.createdBy = payload.userId;
            entity.teacherId = payload.userId;
            entity.status = STATUS.notDone;
            entity.number_enrolled = 0;
            entity.sale = entity.sale ? entity.sale : 0;
            const checkCategory = await categoryService.findOne({ id: entity.categoryId, status: STATUS.active });
            if (checkCategory === null) {
                throw new ErrorHandler(404, "Category is not existed.");
            }
            if (!checkCategory.parentId) {
                throw new ErrorHandler(400, "Add only level 2 category.");
            }
            const result = await courseService.create(entity);
            res.status(201).json(new Response(null, true, result));
        } catch (error) {
            next(error);
        }
    }
);

router.get('/',
    require('../middlewares/validateGetQuery.mdw')(getQuerySchema),
    async function (req, res, next) {
        try {
            let { page, limit, categoryId, teacherId, sort } = req.query;
            page = getPageQuery(page);
            limit = getLimitQuery(limit);

            let lstCategoryId = [];

            if (categoryId) {
                categoryId = parseInt(categoryId);
                if (isNaN(categoryId) || categoryId < 1) {
                    throw new ErrorHandler(400, "Invalid categoryId.");
                }
                const category = await categoryService.findOne({ id: categoryId });
                if (!category) {
                    throw new ErrorHandler(400, "Category is not exist.");
                }
                if (category.parentId) {
                    lstCategoryId.push(categoryId);
                } else {
                    if (category.categories.length === 0) {
                        lstCategoryId.push(category.id);
                    }
                    category.categories.forEach(item => {
                        lstCategoryId.push(item.id);
                    });
                }
            }
            if (teacherId) {
                teacherId = parseInt(teacherId);
                if (isNaN(teacherId) || teacherId < 1) {
                    throw new ErrorHandler(400, "Invalid teacherId.");
                }
            }

            const result = await courseService.findAll(page, limit, lstCategoryId, teacherId, sort);
            res.status(200).json(new PageResponse(null, true, result, page, limit));
        } catch (error) {
            next(error);
        }
    }
);

router.get('/newest', async function (req, res, next) {
    try {
        const result = await courseService.findNewest();
        res.status(200).json(new Response(null, true, result));
    } catch (error) {
        next(error);
    }
});

router.get('/highlights', async function (req, res, next) {
    try {
        const result = await courseService.getListHighlightCourses();
        res.status(200).json(new Response(null, true, result));
    } catch (error) {
        next(error);
    }
})

router.get('/most-views', async function (req, res, next) {
    try {
        const result = await courseService.getListMostViewsCourses();
        res.status(200).json(new Response(null, true, result));
    } catch (error) {
        next(error);
    }
});

router.get('/most-enrolled', async function (req, res, next) {
    try {
        const result = await courseService.findMostEnrolled();
        res.status(200).json(new Response(null, true, result));
    } catch (error) {
        next(error);
    }
});

router.get('/enrolled', AuthMdw, ValidateQuery(getQuerySchema), async function (req, res, next) {
    try {
        let { page, limit } = req.query;
        page = getPageQuery(page);
        limit = getLimitQuery(limit);
        let userId = req.accessTokenPayload.userId;
        const result = await courseService.GetListEnrolledCourses(userId, page, limit);
        res.status(200).json(new PageResponse(null, true, result, page, limit));
    } catch (error) {
        next(error);
    }
});

router.get('/watch-list', AuthMdw, async function(req,res, next){
    try {
        let { page, limit } = req.query;
        page = getPageQuery(page);
        limit = getLimitQuery(limit);
        let userId = req.accessTokenPayload.userId;
        const result = await courseService.GetSelfWatchList(userId, page, limit);
        res.status(200).json(new PageResponse(null, true, result, page, limit));
    } catch (error) {
        next(error);
    }
});

router.get('/search',
    require('../middlewares/validateGetQuery.mdw')(getQuerySchema),
    async function (req, res, next) {
        try {
            let { page, limit, query } = req.query;
            page = getPageQuery(page);
            limit = getLimitQuery(limit);

            const result = await courseService.SearchCoursePaged(page, limit, query);
            res.status(200).json(new PageResponse(null, true, result, page, limit));
        } catch (error) {
            next(error);
        }
    });

router.get('/:id', async function (req, res, next) {
    try {
        let { id } = req.params;
        id = parseInt(id);
        if (isNaN(id) || id < 1) {
            throw new ErrorHandler(400, "Invalid Id.");
        }

        const result = await courseService.findOneNotDoneOrActive({ id });
        res.status(200).json(new Response(null, true, result));
    } catch (error) {
        next(error);
    }
});

router.get('/:id/rating', async function (req, res, next) {
    try {
        let { id } = req.params;
        id = parseInt(id);
        if (isNaN(id) || id < 1) {
            throw new ErrorHandler(400, "Invalid Id.");
        }

        const course = await courseService.findOneNotDoneOrActive({ id });
        if (!course) {
            throw new ErrorHandler(400, "Course is not exist.");
        }

        const result = await courseService.findRating(id);
        Object.keys(result).forEach(key => {
            result[key] = parseInt(result[key]);
        })
        res.status(200).json(new Response(null, true, result));
    } catch (error) {
        next(error);
    }
});

router.get('/:id/enroll', AuthMdw, async function (req, res, next) {
    try {
        let { id } = req.params;
        id = parseInt(id);
        if (isNaN(id) || id < 0) throw new ErrorHandler(400, "Id NaN.");
        let userId = req.accessTokenPayload.userId;
        const result = await enrollListsService.GetEnrollCourseInfo(id, userId);
        res.status(200).json(new Response(null, true, result));
    } catch (error) {
        next(error);
    }
});

router.post('/:id/enroll', AuthMdw, async function (req, res, next) {
    try {
        let { id } = req.params;
        id = parseInt(id);
        if (isNaN(id) || id < 0) throw new ErrorHandler(400, "Id NaN.");
        let userId = req.accessTokenPayload.userId;
        const result = await enrollListsService.EnrollCourses(id, userId);
        res.status(200).json(new Response(null, true, result));
    } catch (error) {
        next(error);
    }
});

router.put('/:id/enroll', AuthMdw, ValidateMdw(enrollCourseSchema), async function (req, res, next) {
    try {
        let { id } = req.params;
        id = parseInt(id);
        if (isNaN(id) || id < 0) throw new ErrorHandler(400, "Id NaN.");
        let enroll = req.body;
        enroll.createdBy = req.accessTokenPayload.userId;
        enroll.courseId = id;
        const result = await enrollListsService.UpdateEnrollCourses(enroll);
        res.status(200).json(new Response(null, true, result));
    } catch (error) {
        next(error);
    }
});

router.get('/:id/feedbacks', async function (req, res, next) {
    try {
        let { id } = req.params;
        id = parseInt(id);
        if (isNaN(id) || id < 1) {
            throw new ErrorHandler(400, "Invalid Id.");
        }
        const currentCourse = await courseService.findOneNotDoneOrActive({ id });
        if (currentCourse === null) {
            throw new ErrorHandler(404, "Course is not existed.");
        }
        let { page, limit } = req.query;
        page = getPageQuery(page);
        limit = getLimitQuery(limit);
        const result = await feedbackService.findAll(page, limit, id);
        res.status(200).json(new PageResponse(null, true, result, page, limit));

    } catch (error) {
        next(error);
    }
});

router.get('/:id/chapters', async function (req, res, next) {
    try {
        let { id } = req.params;
        id = parseInt(id);
        if (isNaN(id) || id < 1) {
            throw new ErrorHandler(400, "Invalid Id.");
        }
        const currentCourse = await courseService.findOneNotDoneOrActive({ id });
        if (currentCourse === null) {
            throw new ErrorHandler(404, "Course is not existed.");
        }
        let { page, limit } = req.query;
        page = getPageQuery(page);
        limit = getLimitQuery(limit);
        const result = await chapterService.findAll(page, limit, id);
        res.status(200).json(new PageResponse(null, true, result, page, limit));

    } catch (error) {
        next(error);
    }
});

router.get('/:id/enroll', require('../middlewares/auth.mdw'), async function (req, res, next) {
    try {
        let { id } = req.params;
        id = parseInt(id);
        if (isNaN(id) || id < 1) {
            throw new ErrorHandler(400, "Invalid Id.");
        }
        const currentCourse = await courseService.findOneNotDoneOrActive({ id });
        if (currentCourse === null) {
            throw new ErrorHandler(404, "Course is not existed.");
        }
        let userId = req.accessTokenPayload.userId;
        const result = await enrollListsService.GetEnrollCourseInfo(id, userId);
        res.status(200).json(new Response(null, true, result));
    } catch (error) {
        next(error);
    }
});

router.post('/:id/enroll', require('../middlewares/auth.mdw'), async function (req, res, next) {
    try {
        let { id } = req.params;
        id = parseInt(id);
        if (isNaN(id) || id < 1) {
            throw new ErrorHandler(400, "Invalid Id.");
        }
        const currentCourse = await courseService.findOneNotDoneOrActive({ id });
        if (currentCourse === null) {
            throw new ErrorHandler(404, "Course is not existed.");
        }
        let userId = req.accessTokenPayload.userId;
        const checkEnroll = await enrollListsService.findOne({ createdBy: userId, courseId: id })
        if (checkEnroll) {
            throw new ErrorHandler(400, "User has already enrolled this course.");
        }
        const result = await enrollListsService.EnrollCourses(id, userId);
        await courseService.updateEnrolled(currentCourse);
        await categoryService.updateEnrolled(currentCourse.categoryId)
        res.status(200).json(new Response(null, true, result));
    } catch (error) {
        next(error);
    }
});

router.put('/:id/enroll', require('../middlewares/auth.mdw'), require('../middlewares/validate.mdw')(enrollListSchema), async function (req, res, next) {
    try {
        let { id } = req.params;
        id = parseInt(id);
        if (isNaN(id) || id < 0) {
            throw new ErrorHandler(400, "Id NaN.");
        }
        const currentCourse = await courseService.findOne({ id });
        if (currentCourse === null) {
            throw new ErrorHandler(404, "Course is not existed.");
        }
        let enrollInfo = req.body;
        enrollInfo.createdBy = req.accessTokenPayload.userId;
        enrollInfo.courseId = id;
        const result = await enrollListsService.UpdateEnrollCourses(enrollInfo);
        res.status(200).json(new Response(null, true, result));
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

            const dbEntity = await courseService.findOneNotDoneOrActive({ id });

            if (!dbEntity) {
                throw new ErrorHandler(404, "Course is not existed.");
            }

            if (payload.type !== USER_TYPE.admin &&
                (payload.type !== USER_TYPE.teacher || currentUser.userId !== dbEntity.teacherId)) {
                throw new ErrorHandler(403, "Permission denied.");
            }

            if (entity.categoryId) {
                const checkCategory = await categoryService.findOne({ id: entity.categoryId, status: STATUS.active });
                if (checkCategory === null) {
                    throw new ErrorHandler(404, "Category is not existed.");
                }
                if (!checkCategory.parentId) {
                    throw new ErrorHandler(400, "Add only level 2 category.")
                }
            }

            const newEntity = { ...entity, updatedBy: currentUser.userId };
            const result = await courseService.update(dbEntity, newEntity);
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
            const payload = req.accessTokenPayload;
            const currentUser = { userId: payload.userId };

            const id = parseInt(req.params.id);
            if (isNaN(id) || id < 1) {
                throw new ErrorHandler(400, "Invalid Id.");
            }

            const dbEntity = await courseService.findOneNotDoneOrActive({ id });

            if (dbEntity === null) {
                throw new ErrorHandler(404, "Course is not existed.");
            }

            if (payload.type !== USER_TYPE.admin &&
                (payload.type !== USER_TYPE.teacher || currentUser.userId !== dbEntity.teacherId)) {
                throw new ErrorHandler(403, "Permission denied.");
            }

            await courseService.update(dbEntity, {
                status: STATUS.deleted,
                updatedBy: currentUser.userId
            });
            res.status(200).json(new Response(null, true, null));
        } catch (error) {
            next(error);
        }
    });

module.exports = router;