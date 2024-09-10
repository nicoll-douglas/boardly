const User = require("@/models/User");

exports._get = async (req, res, next) => {
  const USER_ROLE = req.USER_ROLE;
  const { username } = req.params;

  try {
    let requestedUser = await User.findOne({ username })
      .select("-email -hashedPassword -refreshToken -verified")
      .populate({
        path: "threads",
        select: "title body createdAt",
      })
      .populate({
        path: "replies",
        select: "body thread createdAt",
      })
      .populate({
        path: "boards",
        select: "name",
      });

    if (!requestedUser) res.status(404).end();
    requestedUser = requestedUser.toObject();

    res
      .status(200)
      ._append("profile", requestedUser)
      ._append("USER_ROLE", USER_ROLE)
      ._end();
  } catch (err) {
    next(err);
  }
};
