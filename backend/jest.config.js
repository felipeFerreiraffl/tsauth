/** @type {import('jest').Config} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  // Configurações importantes para TypeScript
  moduleFileExtensions: ["ts", "js", "json"],
  transformIgnorePatterns: ["node_modules/(?!(.*\\.mjs$))"],
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts", "!src/server.ts"],
  transform: {
    "^.+\\.ts": [
      "ts-jest",
      {
        useESM: false,
        tsconfig: {
          module: "commonjs",
        },
      },
    ],
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testTimeout: 30000,
  // Configurações para resolver problemas de ES modules
  extensionsToTreatAsEsm: [".ts"],
};
