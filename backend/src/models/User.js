const mongoose = require("mongoose");
const crypto = require("crypto");

const user = new mongoose.Schema(
  {
    username: String,
    email: String,
    hashedPassword: String,
    refreshToken: String,
    verified: {
      type: Boolean,
      default: false,
    },
    age: {
      type: mongoose.Schema.Types.Mixed,
      default: "",
      enum: [String, Number],
    },
    pronouns: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    hasAvatar: {
      type: String,
      default: "",
    },
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: "Thread" }],
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
    boards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Board" }],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

user.methods.setPassword = function (password) {
  try {
    console.log("Starting password hash for:", this._id);

    // Create a random salt
    const salt = crypto.randomBytes(16).toString("hex");

    // Hash the password with the salt
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");

    // Store both salt and hash
    this.hashedPassword = `${salt}:${hash}`;

    console.log("Password hashed successfully");
    return this;
  } catch (error) {
    console.error("Error in setPassword:", error);
    throw error; // Re-throw to be caught by the caller
  }
};

module.exports = mongoose.model("User", user);
