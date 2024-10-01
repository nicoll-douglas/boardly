const { User } = require("@/models");

exports.getAllBoards = (options = { me: false }) => {
  return async (req, res, next) => {
    const query = options.me
      ? { _id: req.user._id }
      : { username: req.params.username };

    req.log("query for user");
    try {
      let user = await User.findOne(query).select("boards deleted").populate({
        path: "boards",
        select: "name createdAt rules deleted",
      });

      if (!user || user.deleted) {
        req.log("not found, 404, sent");
        return res.status(404).end();
      }

      req.log("user to object");
      user = user.toObject();

      req.log("200, appended boards, sent");
      return res
        .status(200)
        ._append(
          "boards",
          user.boards.filter((board) => !board.deleted)
        )
        ._end();
    } catch (err) {
      next(err);
    }
  };
};
