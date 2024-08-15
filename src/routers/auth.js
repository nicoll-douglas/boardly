const express = require("express");
const validateBody = require("@/middleware/validation/validateBody");
const validateHTTPAuth = require("@/middleware/validation/validateHTTPAuth");
const auth = require("@/lib/validationSchemas/auth");
const limiter = require("@/middleware/global/limiter");

const router = express.Router();

router.post(
  "/register",
  limiter(),
  validateBody({
    email: auth.new.email,
    confirmEmail: auth.new.email,
    username: auth.new.username,
    password: auth.new.password,
  }),
  require("@/controllers/auth/register")
);

router.post(
  "/login",
  limiter(),
  validateBody({
    username: auth.existing.username,
    password: auth.existing.password,
  }),
  require("@/controllers/auth/login")
);

router.patch(
  "/verify",
  limiter(),
  validateHTTPAuth,
  require("@/controllers/auth/verify")
);

router.post(
  "/forgot",
  limiter(),
  validateBody({
    email: auth.existing.email,
    confirmEmail: auth.existing.email,
  }),
  require("@/controllers/auth/forgot")
);

router.post(
  "/reset",
  limiter(),
  validateHTTPAuth,
  validateBody({
    password: auth.new.password,
    confirmPassword: auth.new.password,
  }),
  require("@/controllers/auth/reset")
);

module.exports = router;
