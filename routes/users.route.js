const express = require('express');
const router = express.Router();
const userSchema = require('../schemas/user.json');
const userService = require('../services/user.service');
const AuthMdw = require('../middlewares/auth.mdw');
const AuthRoleMdw = require('../middlewares/auth.roles.mdw');
const userTypeEnum = require('../enums/user-type.enum');
const validateMdw = require('../middlewares/validate.mdw');
const { Response, PageResponse } = require('../response/response');
const {
  getPutSchema,
  getLimitQuery,
  getPageQuery,
} = require('../utils');

router.post('/teacher', AuthMdw, AuthRoleMdw([userTypeEnum.admin]), validateMdw(userSchema), async function (req, res, next) {
  try {
    const teacher = req.body;
    const result = await userService.CreateTeacher(teacher);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', AuthMdw, AuthRoleMdw([userTypeEnum.admin]), async function (req, res, next) {
  try {
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id) || id < 1) {
      throw new ErrorHandler(400, "Invalid Id.");
    }
    await userService.DeleteUser(id);
    res.status(200).json(new Response(null, true, null));
  } catch (error) {
    next(error);
  }
});

router.put('', AuthMdw, async function (req, res, next) {
  try {
    let id = req.accessTokenPayload.userId;
    let user = req.body;
    user.id = id;
    const result = await userService.UpdateUser(user);
    res.status(200).json(new Response(null, true, result));
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async function (req, res, next) {
  try {
    let { id } = req.params;
    id = parseInt(id);
    if (isNaN(id) || id < 1) {
      throw new ErrorHandler(400, "Invalid Id.");
    }
    const result = await userService.getUserInfo(id);
    res.status(200).json(new Response(null, true, result));
  } catch (error) {
    next(error);
  }
})

router.get('', AuthMdw, AuthRoleMdw([userTypeEnum.admin]), async function (req, res, next) {
  try {
    let { page, limit, type } = req.query;
    page = getPageQuery(page);
    limit = getLimitQuery(limit);
    const result = await userService.getListUserByType(type, page, limit);
    res.status(200).json(new PageResponse(null, true, result, page, limit));
  } catch (error) {
    next(error);
  }
})
module.exports = router;