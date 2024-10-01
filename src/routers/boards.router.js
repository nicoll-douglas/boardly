const express = require("express");
const {
  getBoard,
  getAllBoards,
  createBoard,
  deleteBoard,
  updateBoard,
} = require("@/controllers/boards.controller");
const validate = require("@/middleware/validation/validate");
const {
  newBoardSchema,
  updateBoardSchema,
} = require("@/validation/board.schema");

const router = express.Router();

router
  .get("/", getAllBoards)
  .get("/:boardName", getBoard)
  .post("/", validate.body(newBoardSchema), createBoard)
  .delete("/:boardId", deleteBoard)
  .patch("/:boardId", validate.body(updateBoardSchema), updateBoard);

module.exports = router;
