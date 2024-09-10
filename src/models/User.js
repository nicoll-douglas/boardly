const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const user = new mongoose.Schema(
  {
    username: String,
    email: String,
    hashedPassword: String,
    refreshToken: String,
    verified: {
      default: false,
      type: Boolean,
    },
    age: Number,
    pronouns: String,
    bio: {
      type: String,
      default: "Hi, welcome to my profile!",
    },
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
    boards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Board" }],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

user.methods.setPassword = async function (password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  this.hashedPassword = hashedPassword;
};

module.exports = mongoose.model("User", user);
