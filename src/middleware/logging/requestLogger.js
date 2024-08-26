const logger = require("./winston");

function requestLogger(req, res, next) {
  logger.info(`----- REQUEST: [${req.method} ${req.url}] -----`);
  next();
}

module.exports = requestLogger;
