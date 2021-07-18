const express = require('express');
const router = express.Router();
const userSchema = require('../schemas/user.json');
const AuthSchema = require('../schemas/auth.json');
const rfTokenSchema = require('../schemas/refreshtoken.json');
const confirmAccountSchema = require('../schemas/confirm-account.json');
const userService = require('../services/user.service');
const AuthMdw = require('../middlewares/auth.mdw');
const AuthRoleMdw = require('../middlewares/auth.roles.mdw');
const userTypeEnum = require('../enums/user-type.enum');
const { Response } = require('../response/response');

router.post('/register', require('../middlewares/validate.mdw')(userSchema), async function (req, res, next) {
  try {
    const user = req.body;
    const result = await userService.Register(user);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/signin', require('../middlewares/validate.mdw')(AuthSchema), async function (req, res, next) {
  try {
    const user = req.body;
    const result = await userService.SignIn(user);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/refresh-token', require('../middlewares/validate.mdw')(rfTokenSchema), async function (req, res, next) {
  try {
    const token = req.body;
    const result = await userService.CreateAccessToken(token);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/confirm', require('../middlewares/validate.mdw')(confirmAccountSchema), async function (req, res, next) {
  try {
    const result = await userService.ConfirmAccount(req.body.email, req.body.otp);
    res.status(200).json(new Response(null, true, null));
  } catch (error) {
    next(error);
  }
});

module.exports = router;