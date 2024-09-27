const { Thread, Board } = require("@/models");

exports._post = async (req, res, next) => {
  const user = req.user;
  const { board, title, body } = req.body;

  try {
    const boardDoc = await Board.findOne({ name: board });
    if (!boardDoc) {
      return res.status(400)._end();
    }

    await new Thread({
      title,
      body,
      board: boardDoc._id,
      author: user._id,
    }).save();

    return res.status(200)._end();
  } catch (err) {
    next(err);
  }
};
