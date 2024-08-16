function notFoundHandler(req, res, next) {
  return res.sendStatus(404);
}

module.exports = notFoundHandler;
