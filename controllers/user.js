const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorized-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

const SALT_ROUNDS = 10;

module.exports.getAllUsers = (req, res, next) => User.find({})
  .then((users) => res.send(users))
  .catch(next);

module.exports.getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (!user) throw new NotFoundError('Пользователь не найден');
    const currentUser = {
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    };
    return res.send(currentUser);
  })
  .catch(next);

module.exports.getUserById = (req, res, next) => User.findById(req.params.userId)
  .then((user) => {
    if (!user) throw new NotFoundError('Пользователь не найден');
    const resUser = {
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    };
    return res.send(resUser);
  })
  .catch(next);

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, SALT_ROUNDS)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      const userWOPassword = {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      };
      return res.send(userWOPassword);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с такой почтой уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => User.findByIdAndUpdate(
  req.user._id,
  {
    name: req.body.name,
    about: req.body.about,
  },
  {
    new: true,
    runValidators: true,
  },
)
  .then((user) => {
    if (!user) throw new NotFoundError('Пользователь не найден');
    return res.send(user);
  })
  .catch(next);

module.exports.updateAvatar = (req, res, next) => User.findByIdAndUpdate(
  req.user._id,
  { avatar: req.body.avatar },
  {
    new: true,
    runValidators: true,
  },
)
  .then((user) => {
    if (!user) throw new NotFoundError('Пользователь не найден');
    return res.send(user);
  })
  .catch(next);

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res
        .status(200)
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send(res.cookies.jwt);
    })
    .catch(() => {
      next(new UnauthorizedError('Вход в аккаунт не выполнен'));
    });
};
