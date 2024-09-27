const { Board } = require("@/models");

exports._get = async (req, res, next) => {
  const { boardName } = req.params;
  try {
    let board = await Board.findOne({ name: boardName })
      .select("name threads createdAt admin")
      .populate({
        path: "admin",
        select: "username",
      })
      .populate({
        path: "threads",
        select: "title body createdAt replies author",
        populate: {
          path: "author",
          select: "username hasAvatar",
        },
      });

    if (!board) return res.status(404)._end();
    board = board.toObject();
    return res.status(200)._append("board", board)._end();
  } catch (err) {
    return next(err);
  }
};
