const path = require("path");
const winston = require("winston");

const logsFolder = path.join(__dirname, "../../../logs");

exports.prod = winston.createLogger({
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

exports.dev = (req, res, next) => {
  const logFileName = path.join(logsFolder, "requests", `${Date.now()}.log`);

  const logger = winston.createLogger({
    level: "silly",
    format: winston.format.printf(({ message }) => message),
    transports: [new winston.transports.File({ filename: logFileName })],
  });

  logger.info(`${req.method} ${req.url}`);
  res.on("finish", () => logger.info("request end"));

  req.log = (message) => {
    if (process.node.NODE_ENV === "development") {
      logger.info(message);
    }
  };
  next();
};
