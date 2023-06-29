import dotenv from "dotenv";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: ".",
});

dotenv.config({ path: "./.env.local" });

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
};

export default createJestConfig(config);
