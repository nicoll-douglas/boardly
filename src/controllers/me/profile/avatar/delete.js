const bucket = require("@/services/firebaseStorage");
const logger = require("@/middleware/logging/winston");

module.exports = async function (req, res, next) {
  const user = req.user;
  const avatarID = user.avatarID;
  const file = bucket.file(avatarID);

  try {
    logger.info(`Checking if file "${avatarID}" exists...`);
    const [exists] = await file.exists();
    if (exists) {
      logger.info("File exists, deleting...");
      await file.delete();
      logger.info("Status is 200");
      return res.status(200).sendData();
    } else {
      logger.info("File doesn't exist, status is 404");
      return res.status(404).sendData();
    }
  } catch (err) {
    next(err);
  }
};
