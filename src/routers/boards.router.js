const express = require("express");
const { getBoard, getAllBoards } = require("@/controllers/boards.controller");

const router = express.Router();

router.get("/", getAllBoards).get("/:boardName", getBoard);

module.exports = router;
