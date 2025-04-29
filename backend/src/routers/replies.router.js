const express = require("express");
const validate = require("@/middleware/validation/validate");
const replySchema = require("@/validation/reply.schema");
const {
  createReply,
  deleteReply,
} = require("@/controllers/replies.controller");

const router = express.Router();

router
  .post("/", validate.body(replySchema), createReply)
  .delete("/:replyId", deleteReply);

module.exports = router;
