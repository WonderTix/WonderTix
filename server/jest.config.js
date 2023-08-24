/** @type {import('jest').Config} */
const config = {
  verbose: false,
  rootDir: './',
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/testSetup.ts'],
  testMatch: ['**/*.test.ts'],
  displayName: 'WonderTix Server',
  workerIdleMemoryLimit: '512MB',
};

module.exports = config;
