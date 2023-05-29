const User = require('../models/user');
const {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
} = require('../utils/errors');

module.exports.getAllUsers = (req, res) => User.find({})
  .then((users) => res.send(users))
  .catch(() => res.status(SERVER_ERROR_CODE).send({
    message: 'Неизвестная ошибка. Повторите запрос или обратитесь в поддержку',
  }));

module.exports.getUserById = (req, res) => User.findById(req.params.userId)
  .then((user) => {
    if (!user) return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь не найден' });
    const resUser = {
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    };
    return res.send(resUser);
  })
  .catch((err) => {
    if (err.name === 'CastError') return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные в запросе' });
    return res.status(SERVER_ERROR_CODE).send({
      message: 'Неизвестная ошибка. Повторите запрос или обратитесь в поддержку',
    });
  });

module.exports.createUser = (req, res) => User.create({
  name: req.body.name,
  about: req.body.about,
  avatar: req.body.avatar,
})
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные в запросе' });
    return res.status(SERVER_ERROR_CODE).send({
      message: 'Неизвестная ошибка. Повторите запрос или обратитесь в поддержку',
    });
  });

module.exports.updateProfile = (req, res) => User.findByIdAndUpdate(
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
    if (!user) return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь не найден' });
    return res.send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные в запросе' });
    return res.status(SERVER_ERROR_CODE).send({
      message: 'Неизвестная ошибка. Повторите запрос или обратитесь в поддержку',
    });
  });

module.exports.updateAvatar = (req, res) => User.findByIdAndUpdate(
  req.user._id,
  { avatar: req.body.avatar },
  {
    new: true,
    runValidators: true,
  },
)
  .then((user) => {
    if (!user) return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь не найден' });
    return res.send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные в запросе' });
    return res.status(SERVER_ERROR_CODE).send({
      message: 'Неизвестная ошибка. Повторите запрос или обратитесь в поддержку',
    });
  });
