const Joi = require("joi");
const { lax, restricted } = require("@/lib/constants/regex");

const email = Joi.string()
  .required()
  .email({ tlds: { allow: false } });

const auth = {
  new: {
    password: Joi.string()
      .required()
      .min(8)
      .max(30)
      .custom((value, helpers) => {
        const noLetter = !/[a-zA-Z]/.test(value);
        const noNumber = !/[0-9]/.test(value);
        const isInvalid = !lax.test(value);
        if (noLetter || noNumber || isInvalid) {
          return helpers.error("any.invalid");
        }
      }),
    username: Joi.string().required().min(5).max(20).pattern(restricted),
    email,
  },
  existing: {
    password: Joi.string().required(),
    username: Joi.string().required(),
    email,
  },
};

module.exports = auth;
