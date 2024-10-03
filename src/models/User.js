const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bucket = require("@/services/firebaseStorage");

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
      type: mongoose.Schema.Types.Mixed,
      default: false,
      enum: [String, Boolean],
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

user.virtual("avatar").get(function () {
  if (process.env.NODE_ENV === "development") {
    if (this.username !== process.env.SEED_USER) return this.hasAvatar;
  }
  return bucket.file(`avatar-${this._id.toString()}`).publicUrl();
});

user.methods.setPassword = async function (password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  this.hashedPassword = hashedPassword;
  return this;
};

module.exports = mongoose.model("User", user);
