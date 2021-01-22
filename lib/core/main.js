var inquirer = require("inquirer");
var log = require("../utils/log");
const { mainActions } = require("./actions");
const { refresh } = require("../utils/interface");
const { br } = require("../utils/interface");

const runInquirer = (options, callBack) =>
  inquirer
    .prompt(options)
    .then(callBack)
    .catch((error) => {
      log.error(error);
    });

const runAction = (actionName) => {
  mainActions[actionName]();
  refresh();
  log.success("yaaay");
  br();
};

const displayMainOptions = () =>
  runInquirer(
    [
      {
        type: "expand",
        message: "What would you like to do?",
        choices: [
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
        displayMainOptions();
      }
    }
  );

module.exports = {
  displayMainOptions,
};
