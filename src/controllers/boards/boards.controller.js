const { Board } = require("@/models");

exports._get = async (req, res, next) => {
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
