const express = require("express");
const {
  getBoard,
  getAllBoards,
  createBoard,
} = require("@/controllers/boards.controller");
const validate = require("@/middleware/validation/validate");
const boardSchema = require("@/validation/board.schema");

const router = express.Router();

router
  .get("/", getAllBoards)
  .get("/:boardName", getBoard)
  .post("/", validate.body(boardSchema), createBoard);

module.exports = router;
