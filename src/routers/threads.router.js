const express = require("express");
const threadController = require("@/controllers/threads/thread.controller");

const router = express.Router();

router.get("/:threadId", threadController._get);

module.exports = router;
