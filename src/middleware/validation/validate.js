const Joi = require("joi");

exports.body = (schema) => {
  return (req, res, next) => {
    req.logger.debug("[BODY] - VALIDATING");
    const { error } = schema.validate(req.body);

    if (!error) {
      req.logger.debug("[BODY] - VALID");
      return next();
    }

    req.logger.debug(`${error.name}: ${error.details[0].message}`);
    req.logger.http("[RESPONSE] - STATUS 400");

    return res.status(400)._end();
  };
};

exports.auth = () => {
  return (req, res, next) => {
    req.logger.debug("[AUTH] - VALIDATING");
    const { error } = Joi.object({
      authorization: Joi.string().required(),
    }).validate({ authorization: req.headers.authorization });

    if (!error) {
      req.logger.debug("[AUTH] - VALID");
      return next();
    }

    req.logger.debug(`${error.name}: ${error.details[0].message}`);
    req.logger.http("[RESPONSE] - STATUS 401");
    req.logger.http("[RESPONSE] - SENT");

    return res.sendStatus(401);
  };
};
