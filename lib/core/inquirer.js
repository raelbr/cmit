var inquirer = require("inquirer");

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
        { key: "p", name: "Push", value: "push" },
        { key: "n", name: "Change Branch", value: "checkout" },
        { key: "z", name: "Config Commit", value: "config" },
        { key: "q", name: "quit", value: "quit" },
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
      name: "Is is a BREAKING CHANGE?",
      type: "confirm",
    },
  ],
};

module.exports = {
  runInquirer,
  questions,
};
