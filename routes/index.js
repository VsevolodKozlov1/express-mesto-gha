const router = require('express').Router();
const userRouter = require('./user');
const cardRouter = require('./card');
const { NOT_FOUND_CODE } = require('../utils/errors');

router.use(userRouter);
router.use(cardRouter);
router.get('/*', (req, res) => res.status(NOT_FOUND_CODE).send({ message: 'Указан неверный путь' }));
router.post('/*', (req, res) => res.status(NOT_FOUND_CODE).send({ message: 'Указан неверный путь' }));
router.put('/*', (req, res) => res.status(NOT_FOUND_CODE).send({ message: 'Указан неверный путь' }));
router.patch('/*', (req, res) => res.status(NOT_FOUND_CODE).send({ message: 'Указан неверный путь' }));
router.delete('/*', (req, res) => res.status(NOT_FOUND_CODE).send({ message: 'Указан неверный путь' }));

module.exports = router;
