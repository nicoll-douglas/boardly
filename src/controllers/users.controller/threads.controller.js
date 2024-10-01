const User = require("@/models/User");

exports.getAllThreads = (options = { me: false }) => {
  return async (req, res, next) => {
    const query = options.me
      ? { _id: req.user._id }
      : { username: req.params.username };

    req.log("query for user");
    try {
      let user = await User.findOne(query)
        .select("threads deleted")
        .populate({
          path: "threads",
          select: "title body createdAt board replies deleted",
          populate: {
            path: "board",
            select: "name deleted",
          },
        });

      if (!user || user.deleted) {
        req.log("not found, 404, sent");
        return res.status(404).end();
      }

      req.log("user to object");
      user = user.toObject();

      req.log("200, appended threads, sent");
      return res
        .status(200)
        ._append(
          "threads",
          user.threads.filter((thread) => !thread.deleted)
        )
        ._end();
    } catch (err) {
      next(err);
    }
  };
};
