const User = require("@/models/User");

exports.getAllReplies = (options = { me: false }) => {
  return async (req, res, next) => {
    const query = options.me
      ? { _id: req.user._id }
      : { username: req.params.username };

    req.log("query for user");
    try {
      let user = await User.findOne(query)
        .select("replies")
        .populate({
          path: "replies",
          select: "body createdAt thread parent",
          populate: [
            {
              path: "thread",
              select: "title body board author createdAt",
              populate: [
                {
                  path: "board",
                  select: "name",
                },
                {
                  path: "author",
                  select: "username",
                },
              ],
            },
            {
              path: "parent",
              select: "body author createdAt",
              populate: {
                path: "author",
                select: "username",
              },
            },
          ],
        });

      if (!user) {
        req.log("not found, 404, sent");
        return res.status(404).end();
      }

      req.log("user to object");
      user = user.toObject();

      req.log("200, appended replies, sent");
      return res.status(200)._append("replies", user.replies)._end();
    } catch (err) {
      next(err);
    }
  };
};
