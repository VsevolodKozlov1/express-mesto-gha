const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlRegExp = require('../utils/regexp');
const {
  getAllUsers,
  getCurrentUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/user');

userRouter.get('/users', getAllUsers);
userRouter.get('/users/me', getCurrentUser);

userRouter.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserById,
);

userRouter.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile,
);

userRouter.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(urlRegExp),
    }),
  }),
  updateAvatar,
);

module.exports = userRouter;
