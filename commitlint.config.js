/* eslint-disable no-undef */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "test", "chore", "revert"],
    ],
    "scope-case": [2, "always", "lower-case"],
    "subject-max-length": [2, "always", 72],
  },
};

/* eslint-enable no-undef */
