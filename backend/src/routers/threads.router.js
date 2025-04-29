const express = require("express");
const {
  getThread,
  deleteThread,
  createThread,
  getLatestThreads,
} = require("@/controllers/threads.controller");
const validate = require("@/middleware/validation/validate");
const threadSchema = require("@/validation/thread.schema");

const router = express.Router();

router
  .get("/:threadId", getThread)
  .post("/", validate.body(threadSchema), createThread)
  .delete("/:threadId", deleteThread)
  .get("/", getLatestThreads);

module.exports = router;
