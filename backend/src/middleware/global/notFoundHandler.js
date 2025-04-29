function notFoundHandler(req, res, next) {
  req.log("Could not find resource, status is 404");
  return res.status(404).end();
}

module.exports = notFoundHandler;
