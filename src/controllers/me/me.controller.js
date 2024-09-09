const User = require("@/models/User");

exports._post = async (req, res, next) => {
  const { age, bio, pronouns } = req.body;
  const user = req.user;
  user.age = age;
  user.bio = bio;
  user.pronouns = pronouns;

  try {
    await user.save();
    req.log("updated user, 200");
    return res.status(200)._end();
  } catch (err) {
    next(err);
  }
};

exports._get = async (req, res, next) => {
  const user = req.user;

  try {
    const id = user._id;
    const profile = await User.findById(id).select(
      "username age bio pronouns avatarID createdAt threads"
    );
    const { avatar, ...rest } = profile.toObject();

    const [exists] = await avatar.exists();
    const url = exists ? avatar.publicUrl() : null;
    req.log("200");

    return res
      .status(200)
      ._append("profile", { avatar: url, ...rest })
      ._end();
  } catch (err) {
    next(err);
  }
};
