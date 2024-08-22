const bucket = require("@/services/firebaseStorage");

module.exports = async function (req, res, next) {
  const user = req.user;
  const avatarID = user.avatarID;
  const file = bucket.file(avatarID);

  try {
    const [exists] = await file.exists();
    if (exists) {
      await file.delete();
      return res.status(200).sendData();
    } else {
      return res.status(404).sendData();
    }
  } catch (err) {
    next(err);
  }
};
