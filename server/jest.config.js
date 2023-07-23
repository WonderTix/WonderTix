/** @type {import('jest').Config} */
const config = {
  verbose: true,
  rootDir: './',
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/testSetup.ts'],
  testMatch: ['**/*.test.ts'],
};

module.exports = config;
