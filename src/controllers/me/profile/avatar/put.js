const bucket = require("@/services/firebaseStorage");

module.exports = function (req, res, next) {
  const imgFile = req.file;
  const user = req.user;

  const file = bucket.file(user.avatarID);

  const stream = file.createWriteStream({
    metadata: {
      contentType: imgFile.mimetype,
    },
  });

  stream
    .on("error", (err) => next(err))
    .on("finish", () => res.status(200).sendData());

  stream.end(imgFile.buffer);
};
