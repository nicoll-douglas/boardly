const Joi = require("joi");
const logger = require("@/middleware/logging/winston");

function validateBody(schema) {
  return (req, res, next) => {
    logger.info("Validating request body...");
    const { error } = Joi.object(schema).validate(req.body);
    if (!error) {
      logger.log("Request body successfully validated");
      return next();
    }
    logger.error(`${error.name}: ${error.details.message}`);
    logger.info("Responding with 400");
    return res.status(400).sendData();
  };
}

module.exports = validateBody;
