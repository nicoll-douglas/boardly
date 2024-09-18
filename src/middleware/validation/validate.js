const Joi = require("joi");
const config = require("@/config");

exports.body = (schema) => {
  return (req, res, next) => {
    req.log("validating body");
    const { error } = schema.validate(req.body);

    if (!error) {
      req.log("body is valid");
      return next();
    }

    req.log(`${error.name}: ${error.details[0].message}`);
    req.log("status is 400");

    return res.status(400)._end();
  };
};

exports.auth = () => {
  return (req, res, next) => {
    req.log("validating auth header");
    const { error } = Joi.object({
      authorization: Joi.string().required(),
    }).validate({ authorization: req.headers.authorization });

    if (!error) {
      req.log("auth header is valid");
      return next();
    }

    req.log(`${error.name}: ${error.details[0].message}`);
    req.log("status is 401");
    req.log("response sent");

    return res.status(401).end();
  };
};

exports.image = (options = {}) => {
  const { optional = true } = options;
  return (req, res, next) => {
    if (!req.file) {
      return optional ? next() : res.status(400)._end();
    }

    const allowedType = config.imgUploads.allowedTypes.includes(
      req.file.mimetype
    );
    return allowedType ? next() : res.status(400).end();
  };
};
