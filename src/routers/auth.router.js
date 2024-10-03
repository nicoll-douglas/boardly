const express = require("express");
const validate = require("@/middleware/validation/validate");
const limiter = require("@/middleware/common/limiter");
const authSchemas = require("@/validation/auth.schema");
const verifyAuth = require("@/middleware/auth/verifyAuth");
const {
  handleForgotPwd,
  handleLogin,
  handleRegister,
  handleEmailVerification,
  handleResetPwd,
  handleLogout,
} = require("@/controllers/auth.controller");

const router = express.Router();

router
  .post(
    "/register",
    limiter(),
    validate.body(authSchemas.register),
    handleRegister
  )
  .post("/login", limiter(), validate.body(authSchemas.login), handleLogin)
  .post("/verify", limiter(), validate.auth(), handleEmailVerification)
  .post(
    "/forgot",
    limiter(),
    validate.body(authSchemas.forgot),
    handleForgotPwd
  )
  .post(
    "/reset",
    limiter(),
    validate.auth(),
    validate.body(authSchemas.reset),
    handleResetPwd
  )
  .get("/refresh", limiter(100, 0.6), verifyAuth, (req, res) =>
    res.status(200)._end()
  )
  .post("/logout", limiter(100, 0.6), handleLogout);

module.exports = router;
