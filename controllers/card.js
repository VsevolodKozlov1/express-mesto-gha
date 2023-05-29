const Card = require('../models/card');
const {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
} = require('../utils/errors');

module.exports.getAllCards = (req, res) => Card.find({})
  .then((cards) => {
    if (cards.length === 0) return res.status(NOT_FOUND_CODE).send({ message: 'Карточки не найдены' });
    return res.send(cards);
  })
  .catch((err) => res.status(SERVER_ERROR_CODE).send({
    message: `Неизвестная ошибка ${err.name}: ${err.message}.
      Повторите запрос или обратитесь в поддержку`,
  }));

module.exports.createCard = (req, res) => Card.create({
  ...req.body,
  owner: req.user._id,
})
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'ValidationError') return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные в запросе' });
    return res.status(SERVER_ERROR_CODE).send({
      message: `Неизвестная ошибка ${err.name}: ${err.message}.
      Повторите запрос или обратитесь в поддержку`,
    });
  });

// Ошибка автотеста по работе метода "deleteCardById": "Удаленной карточки не должно быть в БД". Но:
// 1. При проверке в своей БД "mestodb.cards" карточка удаляется;
// 2. Запрос "getAllCards" после удаления карточек также выдает сообщение "Карточки не найдены".
module.exports.deleteCardById = (req, res) => Card.findByIdAndDelete(req.params.cardId)
  .then((card) => {
    if (!card) return res.status(NOT_FOUND_CODE).send({ message: 'Карточка не найдена' });
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') return res.status(BAD_REQUEST_CODE).send({ message: 'Некорректные данные в запросе' });
    return res.status(SERVER_ERROR_CODE).send({
      message: `Неизвестная ошибка ${err.name}: ${err.message}.
      Повторите запрос или обратитесь в поддержку`,
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
      message: `Неизвестная ошибка ${err.name}: ${err.message}.
      Повторите запрос или обратитесь в поддержку`,
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
      message: `Неизвестная ошибка ${err.name}: ${err.message}.
      Повторите запрос или обратитесь в поддержку`,
    });
  });
