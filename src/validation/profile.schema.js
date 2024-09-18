const Joi = require("joi");
const regex = require("@/lib/constants/regex");

const profileSchema = Joi.object({
  age: Joi.number().max(120).min(0).allow(null).optional(),
  pronouns: Joi.string().max(10).pattern(regex.lax.noWhiteSpace).optional(),
  bio: Joi.string().max(100).pattern(regex.lax.whiteSpace).optional(),
}).unknown();

module.exports = profileSchema;
