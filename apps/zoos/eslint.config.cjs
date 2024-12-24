const nx = require("@nx/eslint-plugin");
const baseConfig = require("../../eslint.config.cjs");

module.exports = [
  ...baseConfig,
  ...nx.configs["flat/react"],
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    // Override or add rules here
    rules: {},
    // overrides: [
    //   {
    //     files: ["./src/routes/*.{tsx}"],
    //     rules: {
    //       "import/first": "off",
    //     },
    //   },
    // ],
  },
];
