const { Board } = require("@/models");

exports.getBoard = async (req, res, next) => {
  const { boardName } = req.params;
  try {
    let board = await Board.findOne({ name: boardName })
      .select("name threads createdAt admin rules")
      .populate({
        path: "admin",
        select: "username",
      })
      .populate({
        path: "threads",
        select: "title body createdAt replies author deleted",
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

exports.getAllBoards = async (req, res, next) => {
  try {
    let boards = await Board.find().select("admin createdAt name").populate({
      path: "admin",
      select: "username",
    });
    boards = boards.map((board) => board.toObject());
    return res.status(200)._append("boards", boards)._end();
  } catch (err) {
    return next(err);
  }
};
