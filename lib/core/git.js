const { exec } = require("child_process");
const simpleGit = require("simple-git");

const git = simpleGit();

const getCurrentBranch = async () => {
  exec("git rev-parse --abbrev-ref HEAD", (error, stdout, stderror) => {});
};

const status = (callBack) => git.status().then(callBack);
const add = () => exec("git add .");
const checkout = (branch) => git().checkoutBranch(branch);

const getCommitMessage = ({
  type,
  scope,
  message,
  isBreakingChange,
  breakingChangeMessage,
} = {}) => {
  const formatedScope = !!scope ? `(${scope})` : "";
  const breakingChangeMark = isBreakingChange ? "!" : "";
  const mainMessage = `${type}${formatedScope}${breakingChangeMark}: ${message}`;
  const breakLine = `

`;
  const footer =
    !!isBreakingChange && !!breakingChangeMessage
      ? `${breakLine}BREAKING CHANGE: ${breakingChangeMessage}`
      : "";

  return `${mainMessage}${footer}`;
};

const commit = (message) => exec(`git commit -m "${message}"`);

module.exports = {
  getCurrentBranch,
  status,
  add,
  checkout,
  commit,
  getCommitMessage,
};
