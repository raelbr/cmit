const inquirer = require("inquirer");
const log = require("../utils/log");

const runInquirer = (options, callBack) =>
  inquirer
    .prompt(options)
    .then(callBack)
    .catch((error) => {
      log.error(error);
    });

const questions = {
  main: [
    {
      type: "expand",
      message: "What would you like to do?",
      choices: [
        { key: "s", name: "Status", value: "status" },
        { key: "a", name: "Add", value: "add" },
        { key: "c", name: "Commit Changes", value: "commit" },
        { key: "u", name: "Pull", value: "pull" },
        { key: "p", name: "Push", value: "push" },
        { key: "l", name: "Log", value: "log" },
        { key: "b", name: "Branch Options", value: "checkout" },
        { key: "q", name: "Quit", value: "quit" },
      ],
      name: "action",
    },
  ],
  commit: [
    {
      name: "type",
      type: "list",
      message: "Commit type:",
      choices: ["fix", "feat", "refactor", "build", "docs", "test"],
      default: "fix",
    },
    {
      name: "scope",
      type: "input",
      message: "Scope (optional):",
    },
    {
      name: "message",
      type: "input",
      message: "Message:",
    },
    {
      name: "isBreakingChange",
      type: "confirm",
      message: "Is is a BREAKING CHANGE?",
      default: false,
    },
    {
      name: "breakingChangeMessage",
      type: "input",
      message: "BREAKING CHANGE message:",
      when: ({ isBreakingChange }) => isBreakingChange === true,
    },
  ],
  commitConfirm: [
    {
      name: "confirmCommit",
      type: "confirm",
      message: "Confirm commit?",
      default: true,
    },
  ],
};

module.exports = {
  runInquirer,
  questions,
};
