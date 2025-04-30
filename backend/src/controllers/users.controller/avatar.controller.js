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
    // Get file extension from mimetype
    const fileExt = imgFile.mimetype.split('/')[1];
    
    // Create filename with user ID and extension
    const filename = `${user._id}.${fileExt}`;
    const avatarPath = path.join(AVATARS_DIR, filename);
    
    // Save the file with extension
    await fs.writeFile(avatarPath, imgFile.buffer);

    // Store the filename (with extension) in the user model
    user.hasAvatar = filename;
    await user.save();

    req.log(`Avatar saved to public/avatars as ${filename}`);
    return res.status(200)._end();
  } catch (err) {
    next(err);
  }
};

exports.deleteAvatar = async (req, res, next) => {
  const user = req.user;
  
  try {
    req.log(`does avatar file exist?`);
    
    // Check if user has an avatar
    if (!user.hasAvatar) {
      req.log("doesn't exist, 404, sent");
      return res.status(404)._end();
    }
    
    // Get the avatar path using the stored filename
    const avatarPath = path.join(AVATARS_DIR, user.hasAvatar);
    
    try {
      await fs.access(avatarPath);
      await fs.unlink(avatarPath);
      req.log("file exists, deleted");
    } catch (error) {
      req.log(`File not found: ${error.message}`);
      // Continue anyway to update user model
    }
    
    user.hasAvatar = "";
    await user.save();
    req.log("200, sent");
    return res.status(200)._end();
  } catch (err) {
    next(err);
  }
};
