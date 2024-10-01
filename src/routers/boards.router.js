const express = require("express");
const {
  getBoard,
  getAllBoards,
  createBoard,
  deleteBoard,
} = require("@/controllers/boards.controller");
const validate = require("@/middleware/validation/validate");
const boardSchema = require("@/validation/board.schema");

const router = express.Router();

router
  .get("/", getAllBoards)
  .get("/:boardName", getBoard)
  .post("/", validate.body(boardSchema), createBoard)
  .delete("/:boardId", deleteBoard);

module.exports = router;
