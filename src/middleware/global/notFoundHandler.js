function notFoundHandler(req, res, next) {
  req.log("Could not find resource, status is 404");
  return res.sendStatus(404);
}

module.exports = notFoundHandler;
