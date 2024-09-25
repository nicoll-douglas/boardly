const { Thread } = require("@/models");

exports._get = async (req, res, next) => {
  const { threadId } = req.params;

  try {
    let thread = await Thread.findById(threadId)
      .select("title body createdAt board author replies")
      .populate({
        path: "board",
        select: "name admin threads createdAt",
        populate: {
          path: "admin",
          select: "username",
        },
      })
      .populate({
        path: "author",
        select: "username",
      })
      .populate({
        path: "replies",
        select: "author body createdAt parent",
        populate: [
          {
            path: "author",
            select: "username",
          },
          {
            path: "parent",
            select: "author body createdAt",
            populate: {
              path: "author",
              select: "username",
            },
          },
        ],
      });

    if (!thread) return res.status(404)._end();

    thread = thread.toObject();
    return res.status(200)._append("thread", thread)._end();
  } catch (err) {
    return next(err);
  }
};
