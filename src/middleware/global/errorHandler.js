function errorHandler(err, req, res, next) {
  req.log(`${err.message}`);
  req.log(err.stack);
  req.log("500");
  res.status(500)._end();
}

module.exports = errorHandler;
