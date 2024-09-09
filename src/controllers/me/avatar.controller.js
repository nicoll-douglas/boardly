exports._delete = async (req, res, next) => {
  const user = req.user;
  const file = user.avatar;

  try {
    req.log(`does avatar file exist?`);
    const [exists] = await file.exists();

    if (exists) {
      await file.delete();
      req.log("file exists, deleted, 200");
    }
    return res.status(200)._end();
  } catch (err) {
    next(err);
  }
};

exports._put = (req, res, next) => {
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
