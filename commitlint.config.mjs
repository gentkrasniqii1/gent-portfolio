/** @type {import("@commitlint/types").UserConfig} */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "refactor",
        "docs",
        "style",
        "chore",
        "perf",
        "test",
        "ci",
        "build",
        "revert",
      ],
    ],
    "subject-case": [2, "never", ["pascal-case", "upper-case"]],
  },
};

export default config;
