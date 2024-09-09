const express = require("express");
const validate = require("@/middleware/validation/validate");
const limiter = require("@/middleware/common/limiter");
const authSchemas = require("@/validation/auth.schema");
const handleRefresh = require("@/middleware/auth/handleRefresh");

const router = express.Router();

router
  .post(
    "/register",
    limiter(),
    validate.body(authSchemas.register),
    require("@/controllers/auth/register.controller")
  )
  .post(
    "/login",
    limiter(),
    validate.body(authSchemas.login),
    require("@/controllers/auth/login.controller")
  )
  .post(
    "/verify",
    limiter(),
    validate.auth(),
    require("@/controllers/auth/verify.controller")
  )
  .post(
    "/forgot",
    limiter(),
    validate.body(authSchemas.forgot),
    require("@/controllers/auth/forgot.controller")
  )
  .post(
    "/reset",
    limiter(),
    validate.auth(),
    validate.body(authSchemas.reset),
    require("@/controllers/auth/reset.controller")
  )
  .get("/refresh", limiter(100, 0.6), handleRefresh, (req, res) =>
    res.status(200)._end()
  );

module.exports = router;
