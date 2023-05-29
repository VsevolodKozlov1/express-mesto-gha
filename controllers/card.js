const Card = require('../models/card');
const {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
} = require('../utils/errors');

module.exports.getAllCards = (req, res) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(() => res.status(SERVER_ERROR_CODE).send({
    message: 'Неизвестная ошибка. Повторите запрос или обратитесь в поддержку',
  }));

module.exports.createCard = (req, res) => Card.create({
  name: req.body.name,
  link: req.body.link,
  owner: req.user._id,
})
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'ValidationError') return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные в запросе' });
    return res.status(SERVER_ERROR_CODE).send({
      message: 'Неизвестная ошибка. Повторите запрос или обратитесь в поддержку',
    });
  });

module.exports.deleteCardById = (req, res) => Card.findByIdAndDelete(req.params.cardId)
  .then((card) => {
    if (!card) return res.status(NOT_FOUND_CODE).send({ message: 'Карточка не найдена' });
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные в запросе' });
    return res.status(SERVER_ERROR_CODE).send({
      message: 'Неизвестная ошибка. Повторите запрос или обратитесь в поддержку',
    });
  });

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) return res.status(NOT_FOUND_CODE).send({ message: 'Карточка не найдена' });
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные в запросе' });
    return res.status(SERVER_ERROR_CODE).send({
      message: 'Неизвестная ошибка. Повторите запрос или обратитесь в поддержку',
    });
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) return res.status(NOT_FOUND_CODE).send({ message: 'Карточка не найдена' });
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные в запросе' });
    return res.status(SERVER_ERROR_CODE).send({
      message: 'Неизвестная ошибка. Повторите запрос или обратитесь в поддержку',
    });
  });
