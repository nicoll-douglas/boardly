const Joi = require("joi");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = Joi.object(schema).validate(req.body);
    if (!error) return next();
    return res.status(400).sendData();
  };
}

module.exports = validateBody;
