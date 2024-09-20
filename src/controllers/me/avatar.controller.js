const bucket = require("@/services/firebaseStorage");

exports._put = async (req, res, next) => {
  const imgFile = req.file;
  const user = req.user;
  const file = bucket.file(`avatar-${user._id}`);

  if (!imgFile) {
    return res.status(400)._end();
  }

  req.log("new write stream");
  const stream = file.createWriteStream({
    metadata: {
      contentType: imgFile.mimetype,
    },
  });

  stream
    .on("error", (err) => next(err))
    .on("finish", async () => {
      try {
        req.log("making file public...");
        await file.makePublic();

        user.hasAvatar = true;
        await user.save();
        req.log("saved user.hasAvatar = true");

        req.log("200, sent");
        return res.status(200)._end();
      } catch (err) {
        next(err);
      }
    });

  req.log("writing...");
  stream.end(imgFile.buffer);
};

exports._delete = async (req, res, next) => {
  const user = req.user;
  const file = bucket.file(`avatar-${user._id}`);

  try {
    req.log(`does avatar file exist?`);
    const [exists] = await file.exists();

    if (exists) {
      await file.delete();
      req.log("file exists, deleted");

      user.hasAvatar = false;
      await user.save();
      req.log("saved user.hasAvatar = true");

      req.log("200, sent");
      return res.status(200)._end();
    } else {
      req.log("doesn't exist, 404, sent");
      return res.status(404)._end();
    }
  } catch (err) {
    next(err);
  }
};
