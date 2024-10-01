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
        select: "name admin threads createdAt rules deleted",
        populate: {
          path: "admin",
          select: "username deleted",
        },
      })
      .populate({
        path: "author",
        select: "username hasAvatar deleted",
      })
      .populate({
        path: "replies",
        select: "author body createdAt parent deleted",
        populate: [
          {
            path: "author",
            select: "username hasAvatar deleted",
          },
          {
            path: "parent",
            select: "author body createdAt deleted",
            populate: {
              path: "author",
              select: "username hasAvatar deleted",
            },
          },
        ],
      });

    if (!thread || thread.deleted) return res.status(404)._end();

    thread = thread.toObject();
    thread.replies = thread.replies.filter((reply) => !reply.deleted);
    return res.status(200)._append("thread", thread)._end();
  } catch (err) {
    return next(err);
  }
};

exports.deleteThread = async (req, res, next) => {
  const user = req.user;
  const { threadId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(threadId)) {
    return res.status(404)._end();
  }

  try {
    const thread = await Thread.findById(threadId);
    if (!thread) return res.status(404)._end();
    if (!thread.author.equals(user._id)) return res.status(401)._end();

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

exports.getLatestThreads = async (req, res, next) => {
  try {
    let threads = await Thread.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .select("title body createdAt board author deleted replies deleted")
      .populate({
        path: "board",
        select: "name",
      })
      .populate({
        path: "author",
        select: "username hasAvatar",
      });

    threads = threads
      .map((thread) => thread.toObject())
      .filter((thread) => !thread.deleted);
    return res.status(200)._append("threads", threads)._end();
  } catch (err) {
    return next(err);
  }
};
