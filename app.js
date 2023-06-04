const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const {
  celebrate,
  Joi,
  errors,
} = require('celebrate');
const routes = require('./routes');
const { createUser, login } = require('./controllers/user');
const auth = require('./middlewares/auth');
const errHandler = require('./middlewares/err-handler');

const { PORT = 3000 } = process.env;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
    }),
  }), createUser);

app.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
    }),
  }), login);

app.use(auth);
app.use(routes);
app.use(errors());
app.use(errHandler);

app.listen(PORT, () => {
});
