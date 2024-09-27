const express = require("express");
const threadController = require("@/controllers/threads/thread.controller");
const threadsController = require("@/controllers/threads/threads.controller");
const validate = require("@/middleware/validation/validate");
const threadSchema = require("@/validation/thread.schema");

const router = express.Router();

router
  .get("/:threadId", threadController._get)
  .post("/", validate.body(threadSchema), threadsController._post);

module.exports = router;
