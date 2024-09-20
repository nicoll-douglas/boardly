const Joi = require("joi");
const regex = require("@/lib/constants/regex");

const profileSchema = Joi.object({
  age: Joi.alternatives().try(
    Joi.number().max(120).min(0).optional(),
    Joi.string().valid("").optional()
  ),
  pronouns: Joi.string()
    .max(10)
    .pattern(regex.lax.noWhiteSpace)
    .allow("")
    .optional(),
  bio: Joi.string().max(100).pattern(regex.lax.whiteSpace).allow("").optional(),
}).unknown();

module.exports = profileSchema;
