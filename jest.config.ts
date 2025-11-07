import type { Config } from 'jest';
// import { createDefaultPreset } from 'ts-jest'

const config: Config = {
  cacheDirectory: ".jest-cache",
  clearMocks: true,
  coverageProvider: "babel",
  moduleFileExtensions: ['ts', 'js', 'tsx', 'json'],
  resetModules: false,
  rootDir: "./",
  setupFiles: ["./jest.setup.ts"],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/dist',
    '__generated__',
    '<rootDir>/nodes/Woovi/__tests__/__mocks__',
    '<rootDir>/nodes/Woovi/__tests__/helpers',
    '<rootDir>/nodes/Woovi/__tests__/utils',
  ],
  testRegex: ['(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts|tsx)?$'],
  testEnvironment: "node",
  transformIgnorePatterns: ["/node_modules/(?!callsites)/", "\\.pnp\\.[^\\\/]+$"],
  preset: "ts-jest",
  transform: {
//    '^.+\\.(js|ts|tsx)?$': '@swc/jest',
//    "^.+\\.(js|ts|tsx)?$" : ["ts-jest",{}],
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  // ...createDefaultPreset()
};

export default config;
