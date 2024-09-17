const User = require("@/models/User");

exports._get = async (req, res, next) => {
  const { username } = req.params;

  req.log("query for user");
  try {
    let user = await User.findOne({ username })
      .select("replies")
      .populate({
        path: "replies",
        select: "body createdAt thread children parent",
        populate: [
          {
            path: "thread",
            select: "title body board author",
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
            select: "body author",
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
