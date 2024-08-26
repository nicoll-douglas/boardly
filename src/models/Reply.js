const mongoose = require("mongoose");

const reply = new mongoose.Schema(
  {
    title: String,
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reply", reply);
