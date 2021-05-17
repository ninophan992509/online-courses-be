const express = require('express');
const router = express.Router();
const userSchema = require('../schemas/user.json');
const AuthSchema = require('../schemas/auth.json');
const rfTokenSchema = require('../schemas/refreshtoken.json');
const userController = require('../controllers/user.controller');

router.post('/register', require('../middlewares/validate.mdw')(userSchema), async function (req, res, next) {
    try{
        const user = req.body;
        const result = await userController.Register(user);
        res.status(201).json(result);
    }catch (error) {
        next(error);
    }
});

router.post('/signin', require('../middlewares/validate.mdw')(AuthSchema), async function (req, res, next) {
  try{
    const user = req.body;
    const result = await userController.SignIn(user);
    res.status(200).json(result);
  }catch (error) {
    next(error);
  }
})

router.post('/accesstoken', require('../middlewares/validate.mdw')(rfTokenSchema), async function (req, res, next) {
    try{
      const token = req.body;
      const result = await userController.CreateAccessToken(token);
      res.status(200).json(result);
    }catch (error) {
      next(error);
    }
});

module.exports = router;