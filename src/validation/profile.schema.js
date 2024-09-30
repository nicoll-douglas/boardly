const Joi = require("joi");

const profileSchema = Joi.object({
  age: Joi.alternatives().try(
    Joi.number().max(120).min(0).optional(),
    Joi.string().valid("").optional()
  ),
  pronouns: Joi.string().max(10).allow("").optional(),
  bio: Joi.string().max(100).allow("").optional(),
}).unknown();

module.exports = profileSchema;
