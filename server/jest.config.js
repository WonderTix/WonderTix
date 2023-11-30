/** @type {import('jest').Config} */
const config = {
  verbose: true,
  rootDir: './',
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/testSetup.ts'],
  testMatch: ['**/*.test.ts'],
  displayName: 'WonderTix Server',
  workerIdleMemoryLimit: '512MB',
  setupFiles: ['dotenv/config'],
};

module.exports = {
  // Other Jest configurations...
  globalSetup: './path/to/jest-global-setup.js',
  // globalTeardown: './path/to/jest-global-teardown.js', // Optional
};

module.exports = config;
