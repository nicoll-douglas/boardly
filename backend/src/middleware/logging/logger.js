const path = require("path");
const winston = require("winston");

const logsFolder = path.join(__dirname, "../../../logs");

module.exports = winston.createLogger({
  level: "http",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logsFolder, "app.log"),
      level: "http",
    }),
    new winston.transports.File({
      filename: path.join(logsFolder, "error.log"),
      level: "error",
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.simple(),
        winston.format.colorize()
      ),
      level: "info",
    }),
  ],
});
