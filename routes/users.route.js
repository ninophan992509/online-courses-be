const express = require('express');
const router = express.Router();
const userSchema = require('../schemas/user.json');
const userService = require('../services/user.service');
const AuthMdw = require('../middlewares/auth.mdw');
const AuthRoleMdw = require('../middlewares/auth.roles.mdw');
const userTypeEnum = require('../enums/user-type.enum');
const validateMdw = require('../middlewares/validate.mdw');
const { Response } = require('../response/response');

router.post('/teacher', AuthMdw, AuthRoleMdw([userTypeEnum.admin]),validateMdw(userSchema), async function (req, res, next) {
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
    res.status(200).json(new Response(null,true,null));
  } catch (error) {
    next(error);
  }
});

module.exports = router;