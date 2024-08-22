module.exports = async function (req, res, next) {
  const { age, bio, pronouns } = req.body;
  const user = req.user;
  user.age = age;
  user.bio = bio;
  user.pronouns = pronouns;

  try {
    await user.save();
    return res.status(200).sendData();
  } catch (err) {
    next(err);
  }
};
