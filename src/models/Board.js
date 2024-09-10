const mongoose = require("mongoose");

const board = new mongoose.Schema(
  {
    name: String,
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("Board", board);
