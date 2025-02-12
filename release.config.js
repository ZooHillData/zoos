module.exports = {
  branches: ["main"],
  preset: "conventionalcommits",
  presetConfig: {
    types: [
      { type: "feat", section: "Features" },
      { type: "fix", section: "Bug Fixes" },
      { type: "chore", section: "Chores" },
      { type: "docs", hidden: true },
      { type: "style", hidden: true },
      { type: "refactor", section: "Refactoring" },
      { type: "perf", hidden: true },
      { type: "test", hidden: true },
    ],
  },
  releaseRules: [
    { type: "refactor", release: "patch" },
    { type: "fix", release: "patch" },
    { type: "feat", release: "minor" },
  ],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        changelogFile: `./CHANGELOG.md`,
      },
    ],
    [
      "@semantic-release/exec",
      {
        prepareCmd: `rm -rf dist && VERSION=\${nextRelease.version} npx nx run-many -t release && VERSION=\${nextRelease.version} npx -p replace-json-property rjp ./package.json version \${nextRelease.version}`,
      },
    ],
    [
      "@semantic-release/git",
      {
        assets: [`packages/**/package.json`, `package.json`, `CHANGELOG.md`],
        message:
          "chore(release): -v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};
