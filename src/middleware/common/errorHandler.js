const logger = require("@/middleware/logging/winston");

function errorHandler(err, req, res, next) {
  logger.error(`Error occurred: ${err.message}`);
  logger.info("Responded with 500");
  res.status(500).sendData();
}

module.exports = errorHandler;
