function errorHandler(err, req, res) {
  console.error(err);
  res.status(500).sendData();
}

module.exports = errorHandler;
