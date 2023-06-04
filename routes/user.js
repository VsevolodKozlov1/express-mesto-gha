const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
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
      userId: Joi.string().alphanum().length(24),
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
      avatar: Joi.string().pattern(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/),
    }),
  }),
  updateAvatar,
);

module.exports = userRouter;
