const { Thread } = require("@/models");
const mongoose = require("mongoose");

exports._get = async (req, res, next) => {
  const { threadId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(threadId)) {
    return res.status(404)._end();
  }

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
        select: "username hasAvatar",
      })
      .populate({
        path: "replies",
        select: "author body createdAt parent",
        populate: [
          {
            path: "author",
            select: "username hasAvatar",
          },
          {
            path: "parent",
            select: "author body createdAt",
            populate: {
              path: "author",
              select: "username hasAvatar",
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
