const userRouter = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/user');

userRouter.get('/users', getAllUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.post('/users', createUser);
userRouter.patch('/users/me', updateProfile);
userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
