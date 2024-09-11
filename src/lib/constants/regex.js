const regex = {
  lax: {
    whiteSpace: /^[A-Za-z0-9!@#$%^&*()\-_=+[\]{}|;:'",.<>?/~\s]*$/,
    noWhiteSpace: /^[A-Za-z0-9!@#$%^&*()\-_=+[\]{}|;:'",.<>?/~]*$/,
  },
  restricted: /^[a-zA-Z0-9_-]*$/,
};

module.exports = regex;
