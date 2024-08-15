function errorHandler(err, req, res) {
  res.status(500).sendData();
}

module.exports = errorHandler;
