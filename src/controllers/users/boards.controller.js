const User = require("@/models/User");

exports._get = async (req, res, next) => {
  const userPrivilege = req.userPrivilege;
  const { username } = req.params;

  req.log("query for user");
  try {
    let user = await User.findOne({ username }).select("boards").populate({
      path: "boards",
      select: "name createdAt",
    });

    if (!user) {
      req.log("not found, 404, sent");
      return res.status(404).end();
    }

    req.log("user to object");
    user = user.toObject();

    req.log("200, appended boards, appended privilege, sent");
    return res
      .status(200)
      ._append("boards", user.boards)
      ._append("userPrivilege", userPrivilege)
      ._end();
  } catch (err) {
    next(err);
  }
};
