const mongoose = require("mongoose");

const reply = new mongoose.Schema(
  {
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
    thread: { type: mongoose.Schema.Types.ObjectId, ref: "Thread" },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("Reply", reply);
