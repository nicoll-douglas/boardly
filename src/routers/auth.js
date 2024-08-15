const express = require("express");
const validateBody = require("@/middleware/validation/validateBody");
const validateHTTPAuth = require("@/middleware/validation/validateHTTPAuth");
const auth = require("@/lib/validationSchemas/auth");

const router = express.Router();

router.post(
  "/register",
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
  validateBody({
    username: auth.existing.username,
    password: auth.existing.password,
  }),
  require("@/controllers/auth/login")
);

router.patch("/verify", validateHTTPAuth, require("@/controllers/auth/verify"));

module.exports = router;
