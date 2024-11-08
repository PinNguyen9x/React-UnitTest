module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom", // đảm bảo sử dụng 'jsdom' cho môi trường browser
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};
