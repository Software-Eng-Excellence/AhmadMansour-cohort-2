module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/testsParsers/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
