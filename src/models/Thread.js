const mongoose = require("mongoose");

const thread = new mongoose.Schema(
  {
    title: String,
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

thread.virtual("replyCount").get(function () {
  return this.replies.length;
});

module.exports = mongoose.model("Thread", thread);
