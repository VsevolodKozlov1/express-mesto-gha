const router = require('express').Router();
const {
  celebrate,
  Joi,
  errors,
} = require('celebrate');
const urlRegExp = require('../utils/regexp');
const auth = require('../middlewares/auth');
const errHandler = require('../middlewares/err-handler');
const { createUser, login } = require('../controllers/user');
const userRouter = require('./user');
const cardRouter = require('./card');
const NotFoundError = require('../errors/not-found-err');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(urlRegExp),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use(auth);

router.use(userRouter);
router.use(cardRouter);
router.all('/*', (req, res, next) => {
  next(new NotFoundError('По данному адресу ничего не найдено!'));
});

router.use(errors());
router.use(errHandler);

module.exports = router;
