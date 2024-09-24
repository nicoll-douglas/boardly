const express = require("express");
const boardsController = require("@/controllers/boards/boards.controller");

const router = express.Router();

router.get("/", boardsController._get);

module.exports = router;
