module.exports = {
  rootDir: './',
  testPathIgnorePatterns: ['/node_modules/', './dist', '__generated__'],

  setupFiles: ['./jest.setup.js'],
  resetModules: false,
  transform: {
    '^.+\\.(js|ts|tsx)?$': '@swc/jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts|tsx)?$',
  moduleFileExtensions: ['ts', 'js', 'tsx', 'json'],
  cacheDirectory: '.jest-cache',
};
