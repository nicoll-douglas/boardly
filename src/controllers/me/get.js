const User = require("@/models/User");
const logger = require("@/middleware/logging/winston");
const bucket = require("@/services/firebaseStorage");

module.exports = async (req, res, next) => {
  try {
    const id = req.user._id;
    const profile = await User.findById(id).select(
      "username age bio pronouns avatarID"
    );
    const { avatarID, ...rest } = profile.toObject();
    const avatar = bucket.file(avatarID);

    const [exists] = await avatar.exists();
    logger.info(
      exists
        ? "Avatar file exists, url is the public url"
        : "Avatar file doesn't exist, url is null"
    );
    const url = exists ? avatar.publicUrl() : null;
    logger.info("Status is 200");
    res
      .status(200)
      .appendData("profile", { avatar: url, ...rest })
      .sendData();
  } catch (err) {
    next(err);
  }
};
