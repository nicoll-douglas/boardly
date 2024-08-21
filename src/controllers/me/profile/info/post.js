const bucket = require("@/services/firebaseStorage");

module.exports = async function (req, res, next) {
  const avatar = req.file;
  const { age, bio, pronouns } = req.body;
  const user = req.user;
  const file = bucket.file(user.avatarID);

  async function updateProfile() {
    user.age = age;
    user.bio = bio;
    user.pronouns = pronouns;
    return await user.save();
  }

  if (avatar) {
    const stream = file.createWriteStream({
      metadata: {
        contentType: avatar.mimetype,
      },
    });

    stream
      .on("error", (err) => next(err))
      .on("finish", async () => {
        try {
          await updateProfile();
          res.status(200).sendData();
        } catch (err) {
          next(err);
        }
      });

    stream.end(avatar.buffer);
  } else {
    try {
      const [exists] = await file.exists();
      if (exists) {
        await file.delete();
      }
      await updateProfile();
      res.status(200).sendData();
    } catch (err) {
      next(err);
    }
  }
};
