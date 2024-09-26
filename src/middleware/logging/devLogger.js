const path = require("path");
const winston = require("winston");

const logsFolder = path.join(__dirname, "../../../logs");

module.exports = (req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    req.log = () => {};
    return next();
  }
  const logFileName = path.join(logsFolder, "requests", `${Date.now()}.log`);

  const logger = winston.createLogger({
    level: "silly",
    format: winston.format.printf(({ message }) => message),
    transports: [new winston.transports.File({ filename: logFileName })],
  });

  logger.info(`${req.method} ${req.url}`);
  res.on("finish", () => logger.info("request end"));

  req.log = (message) => {
    logger.info(message);
  };
  next();
};
