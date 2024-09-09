const Joi = require("joi");
const { laxAndWhitespace } = require("@/lib/constants/regex");

const profileSchema = Joi.object({
  age: Joi.number().min(13).max(120).allow(null),
  bio: Joi.string().max(100).pattern(laxAndWhitespace).allow(""),
  pronouns: Joi.string().valid("", "he/him", "she/her", "they/them"),
});

module.exports = profileSchema;
