const nx = require("@nx/eslint-plugin");
const baseConfig = require("../../eslint.config.cjs");

module.exports = [
  ...baseConfig,
  ...nx.configs["flat/react"],
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      // To check whether the dependencies in the library
      // match the root dependencies
      // TODO - ensure this is working properly
      "@nx/dependency-checks": "error",
    },
  },
];
