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
  },
  { timestamps: true }
);

user.methods.setPassword = async function (password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  this.hashedPassword = hashedPassword;
};

module.exports = mongoose.model("User", user);
