// to be used in chakra ui toast calls

const networkError = {
  status: "error",
  title: "Network Error",
  description: "Something went wrong, please try again.",
};

const serverError = {
  status: "error",
  title: "Server Error",
  description: "Something went wrong, please try again later.",
};

const tooMany15 = {
  status: "warning",
  title: "Too Many Requests",
  description: "Please try again in 15 minutes.",
};

const tooMany = {
  status: "warning",
  title: "Too many requests",
};

export { networkError, serverError, tooMany15, tooMany };
