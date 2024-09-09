module.exports = function (req, res, next) {
  const imgFile = req.file;
  const user = req.user;
  const file = user.avatar;

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

        req.log("200");
        res.status(200)._end();
      } catch (err) {
        next(err);
      }
    });

  req.log("writing...");
  stream.end(imgFile.buffer);
};
