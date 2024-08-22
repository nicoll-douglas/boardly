const Joi = require("joi");
const logger = require("@/middleware/logging/winston");

function validateHTTPAuth(req, res, next) {
  logger.info("Validating HTTP auth header...");
  const { error } = Joi.object({
    authorization: Joi.string().required(),
  }).validate({ authorization: req.headers.authorization });
  if (!error) {
    logger.info("HTTP auth header successfully validated");
    return next();
  }

  logger.error(`${error.name}: ${error.details.message}`);
  logger.info(`Responded with: 401`);
  return res.sendStatus(401);
}

module.exports = validateHTTPAuth;
