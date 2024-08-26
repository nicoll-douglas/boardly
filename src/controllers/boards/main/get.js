const Board = require("@/models/Board");

module.exports = async (req, res, next) => {
  try {
    let mainBoard = await Board.findOne({ name: "_main" })
      .select({
        name: 1,
        admin: 1,
        createdAt: 1,
        threads: { $slice: -50 },
        members: 1,
      })
      .populate({
        path: "admin",
        select: "username",
      })
      .populate({
        path: "threads",
        select: "title createdAt replies author",
        populate: {
          path: "author",
          select: "username",
        },
      });

    mainBoard = mainBoard.toObject();
    res.status(200).appendData("board", mainBoard).sendData();
  } catch (err) {
    next(err);
  }
};
