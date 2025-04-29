const Joi = require("joi");

const replySchema = Joi.object({
  body: Joi.string().max(100).required(),
  thread: Joi.string().required(),
  parent: Joi.string().allow(null).required(),
}).unknown();

module.exports = replySchema;
