const bucket = require("@/services/firebaseStorage");
const logger = require("@/middleware/logging/winston");

module.exports = function (req, res, next) {
  const imgFile = req.file;
  const user = req.user;

  const file = bucket.file(user.avatarID);

  logger.info(`Created write stream for file: ${user.avatarID}`);
  const stream = file.createWriteStream({
    metadata: {
      contentType: imgFile.mimetype,
    },
  });

  stream
    .on("error", (err) => next(err))
    .on("finish", async () => {
      try {
        logger.info("Making file public...");
        await file.makePublic();
        logger.info("Status is 200");
        res.status(200).sendData();
      } catch (err) {
        next(err);
      }
    });

  logger.info(`Writing ${user.avatarID} buffer to storage bucket...`);
  stream.end(imgFile.buffer);
};
