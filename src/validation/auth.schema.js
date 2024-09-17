const Joi = require("joi");
const { lax, restricted } = require("@/lib/constants/regex");

const email = Joi.string()
  .required()
  .email({ tlds: { allow: false } });
const required = Joi.string().required();

const fieldSchemas = {
  new: {
    password: Joi.string()
      .required()
      .min(8)
      .max(30)
      .custom((value, helpers) => {
        const noLetter = !/[a-zA-Z]/.test(value);
        const noNumber = !/[0-9]/.test(value);
        const isInvalid = !lax.noWhiteSpace.test(value);
        if (noLetter || noNumber || isInvalid) {
          return helpers.error("any.invalid");
        }
      }),
    username: Joi.string().required().min(5).max(20).pattern(restricted),
    email,
  },
  existing: {
    password: required,
    username: required,
    email,
  },
};

const register = Joi.object({
  password: fieldSchemas.new.password,
  username: fieldSchemas.new.username,
  email: fieldSchemas.new.email,
}).unknown();

const login = Joi.object({
  password: fieldSchemas.existing.password,
  username: fieldSchemas.existing.username,
}).unknown();

const forgot = Joi.object({
  email: fieldSchemas.existing.email,
}).unknown();

const reset = Joi.object({
  password: fieldSchemas.new.password,
}).unknown();

module.exports = {
  register,
  login,
  forgot,
  reset,
};
