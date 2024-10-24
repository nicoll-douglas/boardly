const express = require("express");
const demoController = require("@/controllers/demo.controller");

const router = express.Router();

router.get("/", demoController);

module.exports = router;
