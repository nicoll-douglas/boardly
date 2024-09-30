const express = require("express");
const userController = require("@/controllers/users.controller");

const router = express.Router();

router
  .get("/:username", userController.getUser())
  .get("/:username/boards", userController.boards.getAllBoards())
  .get("/:username/replies", userController.replies.getAllReplies())
  .get("/:username/threads", userController.threads.getAllThreads());

module.exports = router;
