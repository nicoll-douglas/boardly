const User = require("@/models/User");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs/promises");

exports.avatar = require("./avatar.controller");
exports.replies = require("./replies.controller");
exports.boards = require("./boards.controller");
exports.threads = require("./threads.controller");
exports.password = require("./password.controller");

exports.getUser = (options = { me: false }) => {
  return async (req, res, next) => {
    const isMe = options.me;
    const query = isMe
      ? { _id: req.user._id }
      : { username: req.params.username };

    req.log("query for requested user profile");
    try {
      let requestedUser = await User.findOne(query)
        .select(
          "username age bio hasAvatar pronouns createdAt threads boards replies deleted"
        )
        .populate({
          path: "threads",
          select: "deleted",
        })
        .populate({
          path: "replies",
          select: "deleted",
        })
        .populate({
          path: "boards",
          select: "deleted",
        });

      if (!requestedUser || requestedUser.deleted) {
        req.log("not found, 404, sent");
        return res.status(404)._end();
      }

      req.log("user to object");
      requestedUser = requestedUser.toObject();
      requestedUser.boards = requestedUser.boards.filter(
        (board) => !board.deleted
      );
      requestedUser.replies = requestedUser.replies.filter(
        (reply) => !reply.deleted
      );
      requestedUser.threads = requestedUser.threads.filter(
        (thread) => !thread.deleted
      );

      if (!isMe) {
        res._append("user", {
          username: req.user.username,
        });
      }
      req.log("200, appended user, sent");
      return res.status(200)._append("profile", requestedUser)._end();
    } catch (err) {
      return next(err);
    }
  };
};

exports.updateUser = async (req, res, next) => {
  const user = req.user;
  const { pronouns, age, bio } = req.body;

  req.log("updating user");
  try {
    user.age = age;
    user.bio = bio;
    user.pronouns = pronouns;
    await user.save();
    req.log("user saved, 200, sent");
    return res.status(200)._end();
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const user = req.user;
  const { currentPassword } = req.body;

  try {
    // Split stored hash into salt and hash portions
    const [salt, storedHash] = user.hashedPassword.split(':');
    
    // Hash the provided password with the same salt
    const hash = crypto.pbkdf2Sync(currentPassword, salt, 1000, 64, 'sha512').toString('hex');
    
    // Compare the generated hash with the stored hash
    const passwordMatch = storedHash === hash;

    if (!passwordMatch) {
      return res
        .status(400)
        ._feedback(["currentPassword", "Password is incorrect"]);
    }

    user.deleted = true;
    user.refreshToken = "";
    user.bio = "";
    user.pronouns = "";
    user.age = "";
    user.email = "";
    user.hasAvatar = "";
    await user.save();

    // Only attempt to delete if user has an avatar
    if (user.hasAvatar) {
      const avatarPath = path.join(
        process.cwd(),
        "public",
        "avatars",
        user.hasAvatar
      );

      try {
        req.log(`does user avatar exist?`);
        await fs.access(avatarPath);
        await fs.unlink(avatarPath);
        req.log("avatar exists, deleted");
      } catch {
        req.log("doesn't exist");
      }
    }

    req.log("200, sent");
    return res.status(200)._end();
  } catch (err) {
    return next(err);
  }
};
