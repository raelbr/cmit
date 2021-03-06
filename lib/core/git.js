const { exec } = require("child_process");
const simpleGit = require("simple-git");
const store = require("./store");

const git = simpleGit();

const getCurrentBranch = () => {
  const gitStatus = store.get("gitStatus");
  return !!gitStatus && gitStatus.current;
};

const status = (callBack) => git.status().then(callBack);
const add = () => exec("git add .");

const checkout = (branch) => git().checkoutBranch(branch);

const pull = () =>
  new Promise(async (res, rej) => {
    git
      .pull()
      .then((result) => {
        res(result);
      })
      .catch((err) => {
        rej(err);
      });
  });

const push = () =>
  new Promise(async (res, rej) => {
    const currentBranch = getCurrentBranch();
    if (!!currentBranch) {
      git
        .push(["-u", "origin", currentBranch])
        .then((result) => {
          res(result);
        })
        .catch((err) => {
          rej("An error has occurred");
        });
    } else {
      rej("Current branch could not be identified");
    }
  });

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
  const breakLine = `\n`;
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
  pull,
  push,
};
