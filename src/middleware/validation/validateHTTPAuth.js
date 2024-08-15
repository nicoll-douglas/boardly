const Joi = require("joi");

function validateHTTPAuth(req, res, next) {
  const { error } = Joi.object({
    authorization: Joi.string().required(),
  }).validate({ authorization: req.headers.authorization });
  if (!error) return next();

  return res.status(401);
}

module.exports = validateHTTPAuth;
