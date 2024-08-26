const mongoose = require("mongoose");

const board = new mongoose.Schema(
  {
    name: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

board.virtual("memberCount").get(function () {
  return this.members.length;
});

board.virtual("threadCount").get(function () {
  return this.threads.length;
});

module.exports = mongoose.model("Board", board);
