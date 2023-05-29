const router = require('express').Router();
const userRouter = require('./user');
const cardRouter = require('./card');
const { NOT_FOUND_CODE } = require('../utils/errors');

router.use(userRouter);
router.use(cardRouter);
router.all('/*', (req, res) => res.status(NOT_FOUND_CODE).send({ message: 'Указан неверный путь' }));

module.exports = router;
