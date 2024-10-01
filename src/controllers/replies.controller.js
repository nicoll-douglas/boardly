const mongoose = require("mongoose");
const { Reply, Thread } = require("@/models");

exports.createReply = async (req, res, next) => {
  const user = req.user;
  const { body, thread, parent } = req.body;

  if (!mongoose.Types.ObjectId.isValid(thread)) {
    return res.status(400)._end();
  }

  if (!mongoose.Types.ObjectId.isValid(parent) && parent !== null) {
    return res.status(400)._end();
  }

  try {
    const newReply = await new Reply({
      body,
      thread,
      parent,
      author: user._id,
    }).save();

    const parentThread = await Thread.findById(thread);
    if (!parentThread) {
      return res.status(400)._end();
    }

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
