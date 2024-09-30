const { Thread, Board } = require("@/models");
const mongoose = require("mongoose");

exports.getThread = async (req, res, next) => {
  const { threadId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(threadId)) {
    return res.status(404)._end();
  }

  try {
    let thread = await Thread.findById(threadId)
      .select("title body createdAt board author replies deleted")
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

exports.deleteThread = async (req, res, next) => {
  const { threadId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(threadId)) {
    return res.status(404)._end();
  }

  try {
    const thread = await Thread.findById(threadId);
    thread.deleted = true;
    thread.title = "";
    thread.body = "";
    await thread.save();

    return res.status(200)._end();
  } catch (err) {
    return next(err);
  }
};

exports.createThread = async (req, res, next) => {
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
