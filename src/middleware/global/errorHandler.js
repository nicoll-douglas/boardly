function errorHandler(err, req, res, next) {
  res.status(500).sendData();
}

module.exports = errorHandler;
