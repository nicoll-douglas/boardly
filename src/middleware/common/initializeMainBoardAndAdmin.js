const User = require("@/models/User");
const Board = require("@/models/Board");

let initialized = false;

async function initializeMainBoardAndAdmin(req, res, next) {
  if (initialized) return next();

  try {
    const admin = new User({
      username: process.env.ADMIN_USER,
      verified: true,
      email: process.env.ADMIN_EMAIL,
    });
    await admin.setPassword(process.env.ADMIN_PASS);
    await admin.save();

    await new Board({ name: "_main", admin: admin._id }).save();
    initialized = true;
    return next();
  } catch (err) {
    next(err);
  }
}

module.exports = initializeMainBoardAndAdmin;
