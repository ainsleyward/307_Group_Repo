// jest.config.js
module.exports = {
    testEnvironment: "jsdom",
    testMatch: ["**/frontend_tests/**/*.[jt]s?(x)"],
    transform: {
      "^.+\\.[jt]sx?$": "babel-jest",
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    setupFiles: ["<rootDir>/jest.setup.js"],
  };
  