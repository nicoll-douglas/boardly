const User = require("@/models/User");

exports._get = async (req, res, next) => {
  const { username } = req.params;

  req.log("query for requested user profile");
  try {
    let requestedUser = await User.findOne({ username }).select(
      "username age bio hasAvatar pronouns createdAt"
    );

    if (!requestedUser) {
      req.log("not found, 404, sent");
      return res.status(404).end();
    }

    req.log("user to object");
    requestedUser = requestedUser.toObject();

    req.log("200, appended user, sent");
    return res.status(200)._append("profile", requestedUser)._end();
  } catch (err) {
    next(err);
  }
};
