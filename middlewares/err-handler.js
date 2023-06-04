const ServerError = require('../errors/server-err');

// eslint-disable-next-line no-unused-vars
module.exports = (errInput, req, res, next) => {
  let errOutput = {};
  if (!errInput.statusCode) {
    errOutput = new ServerError('Неизвестная ошибка. Повторите запрос или обратитесь в поддержку');
  } else {
    errOutput = errInput;
  }
  return res.status(errOutput.statusCode).send({ message: errOutput.message });
};
