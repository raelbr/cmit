const execa = require("execa");
const { handleFatalError } = require("../utils/errorHandling");

const isGitRepository = () =>
  execa("git", ["rev-parse", "--is-inside-work-tree"])
    .then(({ stdout }) => {
      return stdout === "true";
    })
    .catch(() => false);

const runInitialChecks = async () => {
  const isValidRepository = await isGitRepository();
  !isValidRepository && handleFatalError("You are not in a git repository");
  return true;
};

module.exports = {
  isGitRepository,
  runInitialChecks,
};
