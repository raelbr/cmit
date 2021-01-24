var log = require("../utils/log");
const { mainActions } = require("./actions");
const { runInquirer, questions } = require("./inquirer");

const runAction = (actionName, { successMessage } = {}) => {
  mainActions[actionName](() => {
    displayMainOptions();
  });
};

const displayMainOptions = () =>
  runInquirer(
    [
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
    ({ action }) => {
      if (action !== "quit") {
        runAction(action);
      }
    }
  );

module.exports = {
  displayMainOptions,
};
