const config = {
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "@root/(.*)": "<rootDir>/$1",
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
};

module.exports = config;
