const rateLimit = require("express-rate-limit");

function limiter(max = 15, window = 15) {
  return rateLimit({
    windowMs: window * 60 * 1000,
    max: max,
  });
}

module.exports = limiter;
