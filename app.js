const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const limiter = require('./utils/limiter-config');
const routes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(routes);

app.listen(PORT, () => {
});
