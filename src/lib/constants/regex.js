const regex = {
  lax: {
    noWhiteSpace: /^[A-Za-z0-9!@#$%^&*()\-_=+[\]{}|;:'",.<>?/~]*$/,
    whiteSpace: /^[A-Za-z0-9!@#$%^&*()\-_=+[\]{}|;:'",.<>?/~\s]*$/,
  },
  restricted: /^[a-zA-Z0-9_-]*$/,
};

export default regex;
