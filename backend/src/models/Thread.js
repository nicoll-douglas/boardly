const mongoose = require("mongoose");

const thread = new mongoose.Schema(
  {
    title: String,
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
    board: { type: mongoose.Schema.Types.ObjectId, ref: "Board" },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("Thread", thread);
