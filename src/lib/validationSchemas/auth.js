const Joi = require("joi");
const { lax, restricted } = require("@/lib/constants/regex");

const email = Joi.string()
  .required()
  .email({ tlds: { allow: false } })
  .messages({
    "any.required": "Email is required",
    "string.base": "Email is invalid",
    "string.empty": "Email is required",
    "string.email": "Email is invalid",
  });

const auth = {
  new: {
    password: Joi.string()
      .required()
      .min(8)
      .max(30)
      .messages({
        "any.required": "Password is required",
        "string.base": "Password is invalid",
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters long",
        "string.max": "Password must be no more than 30 characters long",
      })
      .custom((value, helpers) => {
        if (!/[a-zA-Z]/.test(value)) {
          return helpers.message("Password must contain at least one letter");
        }
        if (!/[0-9]/.test(value)) {
          return helpers.message("Password must contain at least one number");
        }
        if (!lax.test(value)) {
          return helpers.message("Password contains an invalid character");
        }
      }),
    username: Joi.string()
      .required()
      .min(5)
      .max(20)
      .pattern(restricted)
      .messages({
        "any.required": "Username is required",
        "string.base": "Username is invalid",
        "string.empty": "Username is required",
        "string.min": "Username must be at least 5 characters long",
        "string.max": "Username must be no more than 20 characters long",
        "string.pattern.base":
          "Username must only contain letters, numbers, underscores and hyphens",
      }),
    email,
  },

  existing: {
    password: Joi.string().required().messages({
      "any.required": "Password is required",
      "string.base": "Password is required",
      "string.empty": "Password is required",
    }),
    username: Joi.string().required().messages({
      "any.required": "Username is required",
      "string.base": "Username is required",
      "string.empty": "Password is required",
    }),
    email,
  },
};

module.exports = auth;
