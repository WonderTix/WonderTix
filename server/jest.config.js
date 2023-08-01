/** @type {import('jest').Config} */
const config = {
  verbose: true,
  rootDir: './',
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/testSetup.ts'],
  testMatch: ['**/*.test.ts'],
  detectLeaks: true,
  detectOpenHandles: true,
  displayName: 'WonderTix Server',
};

module.exports = config;
