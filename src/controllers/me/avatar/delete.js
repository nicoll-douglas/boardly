module.exports = async function (req, res, next) {
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
