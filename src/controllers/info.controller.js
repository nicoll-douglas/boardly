const { Board, Thread, User, Reply } = require("@/models");

exports.getInfo = async (req, res, next) => {
  try {
    const boardCount = await Board.countDocuments({ deleted: false });
    const threadCount = await Thread.countDocuments({ deleted: false });
    const userCount = await User.countDocuments({ deleted: false });
    const replyCount = await Reply.countDocuments({ deleted: false });

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
