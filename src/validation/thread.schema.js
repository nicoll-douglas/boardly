const Joi = require("joi");

const threadSchema = Joi.object({
  board: Joi.string().required(),
  title: Joi.string().max(50).required(),
  body: Joi.string().max(100).valid("").optional(),
});

module.exports = threadSchema;
