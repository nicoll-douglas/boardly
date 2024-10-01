const { Board, Thread, User, Reply } = require("@/models");

exports.getInfo = async (req, res, next) => {
  try {
    const boardCount = await Board.countDocuments({});
    const threadCount = await Thread.countDocuments({});
    const userCount = await User.countDocuments({});
    const replyCount = await Reply.countDocuments({});

    return res
      .status(200)
      ._append("site", {
        boardCount,
        threadCount,
        userCount,
        replyCount,
      })
      ._end();
  } catch (err) {
    return next(err);
  }
};
