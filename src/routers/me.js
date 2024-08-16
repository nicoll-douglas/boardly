const express = require("express");
const limiter = require("@/middleware/global/limiter");
const validateHTTPAuth = require("@/middleware/validation/validateHTTPAuth");
const verifyAuth = require("@/middleware/auth/verifyAuth");

const router = express.Router();

router.use("/", limiter(100, 0.6), validateHTTPAuth, verifyAuth);
router.get("/", require("@/controllers/me/get"));

module.exports = router;
