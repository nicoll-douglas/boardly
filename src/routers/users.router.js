const express = require("express");
const checkIfSelf = require("@/middleware/auth/checkIfSelf");
const userController = require("@/controllers/users/user.controller");
const boardsController = require("@/controllers/users/boards.controller");
const repliesController = require("@/controllers/users/replies.controller");
const threadsController = require("@/controllers/users/threads.controller");

const router = express.Router();

router
  .get("/:username", checkIfSelf({ reject: false }), userController._get)
  .get(
    "/:username/boards",
    checkIfSelf({ reject: false }),
    boardsController._get
  )
  .get(
    "/:username/replies",
    checkIfSelf({ reject: false }),
    repliesController._get
  )
  .get(
    "/:username/threads",
    checkIfSelf({ reject: false }),
    threadsController._get
  );

module.exports = router;
