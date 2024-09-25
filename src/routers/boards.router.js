const express = require("express");
const boardsController = require("@/controllers/boards/boards.controller");
const boardController = require("@/controller/boards/board.controller");

const router = express.Router();

router.get("/", boardsController._get).get("/:boardName", boardController._get);

module.exports = router;
