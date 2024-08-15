const Joi = require("joi");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = Joi.object(schema).validate(req.body);
    if (!error) return next();

    return res
      .status(400)
      .feedback([error.details[0].context.label, error.details[0].message]);
  };
}

module.exports = validateBody;
