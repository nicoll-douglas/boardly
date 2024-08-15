const config = {
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "@root/(.*)": "<rootDir>/$1",
  },
};

module.exports = config;
