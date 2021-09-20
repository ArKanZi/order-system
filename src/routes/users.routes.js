const express = require('express');
const userRouter = express.Router();

const userCtrl = require('../controllers/users.controller');

const authMiddleware = require('../middlewares/auth.middleware');

userRouter.get('/login', userCtrl.login);
userRouter.get('/register', userCtrl.register);
userRouter.post('/create-user', userCtrl.onRegister);
userRouter.post('/user_login', userCtrl.onUserLogin);
userRouter.get('/forget-password', userCtrl.forgetPassword);
userRouter.get('/change-password', authMiddleware,  userCtrl.changePassword);
userRouter.post('/save-change-password', userCtrl.saveChangePassword);
userRouter.get('/logout', userCtrl.userLogout);

module.exports = userRouter;