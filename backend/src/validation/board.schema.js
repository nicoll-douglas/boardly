const Joi = require("joi");
const regex = require("@/lib/constants/regex");

const rules = Joi.string().max(100).allow("").optional();

const newBoardSchema = Joi.object({
  name: Joi.string().max(20).pattern(regex.restricted).required(),
  rules,
}).unknown();

const updateBoardSchema = Joi.object({
  rules,
}).unknown();

module.exports = {
  newBoardSchema,
  updateBoardSchema,
};
