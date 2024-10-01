const mongoose = require("mongoose");
const { Reply, Thread } = require("@/models");

exports.createReply = async (req, res, next) => {
  const user = req.user;
  const { body, thread, parent } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(thread)) return res.status(400)._end();
    if (!mongoose.Types.ObjectId.isValid(parent) && parent !== null)
      return res.status(400)._end();

    const parentThread = await Thread.findOne({ _id: thread, deleted: false })
      .select("board")
      .populate({
        path: "board",
        select: "deleted",
      });
    if (!parentThread) return res.status(404)._end();
    if (parentThread.board.deleted) return res.status(404)._end();

    if (parent) {
      const parentReply = await Reply.findById({
        _id: parent,
        deleted: false,
      });

      if (!parentReply) return res.status(404)._end();
      if (!parentReply.thread.equals(parentThread._id))
        return res.status(400)._end();
    }

    const newReply = await new Reply({
      body,
      thread,
      parent,
      author: user._id,
    }).save();

    parentThread.replies.push(newReply._id);
    await parentThread.save();

    user.replies.push(newReply._id);
    await user.save();

    return res.status(200)._end();
  } catch (err) {
    return next(err);
  }
};

exports.deleteReply = async (req, res, next) => {
  const user = req.user;
  const { replyId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(replyId)) {
      return res.status(404)._end();
    }

    const reply = await Reply.findById(replyId);
    if (!reply) return res.status(404)._end();
    if (!reply.author.equals(user._id)) return res.status(401)._end();

    reply.body = "";
    reply.deleted = true;
    await reply.save();

    return res.status(200)._end();
  } catch (err) {
    return next(err);
  }
};
