const express = require("express");
const userController = require("@/controllers/users/user.controller");

const router = express.Router();

router
  .get("/:username", userController._get)
  .get(
    "/:username/boards",
    require("@/controllers/users/boards.controller")._get
  )
  .get(
    "/:username/replies",
    require("@/controllers/users/replies.controller")._get
  )
  .get(
    "/:username/threads",
    require("@/controllers/users/threads.controller")._get
  );

module.exports = router;
