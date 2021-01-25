const { refresh } = require("../utils/interface");
var log = require("../utils/log");
const { runMainAction } = require("./actions");
const { runInquirer, questions } = require("./inquirer");

const displayMainOptions = () =>
  runInquirer(questions.main, ({ action }) => {
    if (action !== "quit") {
      runMainAction(action);
    }
  });

module.exports = {
  displayMainOptions,
  caca: "asd",
};
