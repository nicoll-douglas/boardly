const mongoose = require("mongoose");

const reply = new mongoose.Schema(
  {
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    thread: { type: mongoose.Schema.Types.ObjectId, ref: "Thread" },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply", reply);
