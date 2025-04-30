const fs = require("fs/promises");
const path = require("path");

// directory where avatars are stored
const AVATARS_DIR = path.join(process.cwd(), "public", "avatars");

// Ensure avatars directory exists
fs.mkdir(AVATARS_DIR, { recursive: true }).catch(() => {});

exports.updateAvatar = async (req, res, next) => {
  const user = req.user;
  const imgFile = req.file;
  if (!imgFile) return res.status(400)._end();

  try {
    const avatarPath = path.join(AVATARS_DIR, `${user._id}`);
    await fs.writeFile(avatarPath, imgFile.buffer);

    user.hasAvatar = true;
    await user.save();

    req.log("Avatar saved to public/avatars");
    return res.status(200)._end();
  } catch (err) {
    next(err);
  }
};

exports.deleteAvatar = async (req, res, next) => {
  const user = req.user;
  const avatarPath = path.join(AVATARS_DIR, `${user._id}`);

  try {
    req.log(`does avatar file exist?`);
    try {
      await fs.access(avatarPath);
    } catch {
      req.log("doesn't exist, 404, sent");
      return res.status(404)._end();
    }
    await fs.unlink(avatarPath);
    req.log("file exists, deleted");
    user.hasAvatar = false;
    await user.save();
    req.log("200, sent");
    return res.status(200)._end();
  } catch (err) {
    next(err);
  }
};
