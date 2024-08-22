const winston = require("winston");

const logger = winston.createLogger({
  level: "silly",
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.colorize()
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
