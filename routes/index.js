const router = require('express').Router();
const userRouter = require('./user');
const cardRouter = require('./card');
const NotFoundError = require('../errors/not-found-err');

router.use(userRouter);
router.use(cardRouter);
router.all('/*', (req, res, next) => {
  next(new NotFoundError('По данному адресу ничего не найдено!'));
});

module.exports = router;
