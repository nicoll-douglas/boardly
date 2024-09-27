const { Thread, Board } = require("@/models");

exports._post = async (req, res, next) => {
  const user = req.user;
  const { board, title, body } = req.body;

  try {
    const boardDoc = await Board.findOne({ name: board });
    if (!boardDoc) {
      return res.status(400)._end();
    }

    const newThread = await new Thread({
      title,
      body,
      board: boardDoc._id,
      author: user._id,
    }).save();
    boardDoc.threads.push(newThread._id);
    user.threads.push(newThread._id);
    await boardDoc.save();
    await user.save();

    return res.status(200)._end();
  } catch (err) {
    next(err);
  }
};
