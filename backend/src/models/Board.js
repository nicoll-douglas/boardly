const mongoose = require("mongoose");

const board = new mongoose.Schema(
  {
    name: String,
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
    rules: String,
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("Board", board);
