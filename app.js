const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();
app.use(helmet());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '646c76ef2260627a66ca4db3',
  };

  next();
});

app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => {
});
