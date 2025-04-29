const logger = require("../logging/logger");

function errorHandler(err, req, res, next) {
  logger.error(`${err.message}`);
  logger.error(err.stack);
  req.log(`${err.message}`);
  req.log(err.stack);
  req.log("500");
  res.status(500)._end();
}

module.exports = errorHandler;
