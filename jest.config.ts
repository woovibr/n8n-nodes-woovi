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
  testPathIgnorePatterns: ["/node_modules/", './dist', '__generated__'],
  testRegex: ['(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts|tsx)?$'],
  testEnvironment: "node",
  transformIgnorePatterns: ["/node_modules/(?!callsites)/", "\\.pnp\\.[^\\\/]+$"],
  preset: "ts-jest",
  transform: {
//    '^.+\\.(js|ts|tsx)?$': '@swc/jest',
//    "^.+\\.(js|ts|tsx)?$" : ["ts-jest",{}],
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  // ...createDefaultPreset()
};

export default config;
