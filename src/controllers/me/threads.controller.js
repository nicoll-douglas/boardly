const User = require("@/models/User");

exports._get = (options = { me: true }) => {
  return async (req, res, next) => {
    const query = options.me
      ? { _id: req.user._id }
      : { username: req.params.username };

    req.log("query for user");
    try {
      let user = await User.findOne(query)
        .select("threads")
        .populate({
          path: "threads",
          select: "title body createdAt board replies",
          populate: {
            path: "board",
            select: "name",
          },
        });

      if (!user) {
        req.log("not found, 404, sent");
        return res.status(404).end();
      }

      req.log("user to object");
      user = user.toObject();

      req.log("200, appended threads, sent");
      return res.status(200)._append("threads", user.threads)._end();
    } catch (err) {
      next(err);
    }
  };
};
