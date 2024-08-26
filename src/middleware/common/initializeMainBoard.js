const User = require("@/models/User");
const Board = require("@/models/Board");

async function initializeMainBoard() {
  const adminUsername = process.env.ADMIN_USER;

  let admin = await User.findOne({ username: adminUsername });
  if (!admin) {
    admin = new User({
      username: adminUsername,
      verified: true,
      email: process.env.ADMIN_EMAIL,
    });
    await admin.setPassword(process.env.ADMIN_PASS);
    await admin.save();
  }

  let mainBoard = await Board.findOne({ name: "_main" });
  if (!mainBoard) {
    mainBoard = await new Board({ name: "_main", admin: admin._id }).save();
  }
}

module.exports = initializeMainBoard;
