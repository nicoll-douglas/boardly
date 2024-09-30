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
