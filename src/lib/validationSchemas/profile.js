const Joi = require("joi");
const { laxAndWhitespace } = require("@/lib/constants/regex");

const profileSchema = {
  age: Joi.number().min(13).max(120),
  bio: Joi.string().max(100).pattern(laxAndWhitespace),
  pronouns: Joi.string().custom((value, helpers) => {
    if (value === undefined) return;
    const values = ["he/him", "she/her", "they/them", "none"];
    if (!values.includes(value)) return helpers.error("any.invalid");
  }),
};

module.exports = profileSchema;
