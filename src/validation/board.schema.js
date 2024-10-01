const Joi = require("joi");
const regex = require("@/lib/constants/regex");

const boardSchema = Joi.object({
  name: Joi.string().max(20).pattern(regex.restricted).required(),
  rules: Joi.string().max(100).allow("").optional(),
}).unknown();

module.exports = boardSchema;
