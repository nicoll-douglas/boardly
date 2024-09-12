const User = require("@/models/User");

exports._get = async (req, res, next) => {
  const userPrivilege = req.userPrivilege;
  const { username } = req.params;

  req.log("query for requested user");
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

    if (!requestedUser) {
      req.log("not found, 404, sent");
      return res.status(404).end();
    }

    req.log("user to object");
    requestedUser = requestedUser.toObject();

    req.log("200, appended user, appended role, sent");
    return res
      .status(200)
      ._append("profile", requestedUser)
      ._append("userPrivilege", userPrivilege)
      ._end();
  } catch (err) {
    next(err);
  }
};
