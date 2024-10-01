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

exports.createBoard = async (req, res, next) => {
  const user = req.user;
  const { name, rules } = req.body;

  try {
    const duplicateName = await Board.findOne({ name });
    if (duplicateName) {
      return res.status(409)._feedback(["name", "This board already exists"]);
    }

    const board = await new Board({ name, rules, admin: user._id }).save();
    user.boards.push(board._id);
    await user.save();

    return res.status(200)._end();
  } catch (err) {
    return next(err);
  }
};

exports.deleteBoard = async (req, res, next) => {
  const user = req.user;
  const { boardId } = req.params;

  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(400)._end();
    }

    if (!board.admin.equals(user._id)) {
      return res.status(401)._end();
    }

    board.name = "";
    board.deleted = true;
    board.rules = "";
    await board.save();

    return res.status(200)._end();
  } catch (err) {
    return next(err);
  }
};
