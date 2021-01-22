const { exec } = require("child_process");
const simpleGit = require("simple-git");

const git = simpleGit();

const getCurrentBranch = async (label = "Current Branch:") => {
  exec("git rev-parse --abbrev-ref HEAD", (error, stdout, stderror) => {});
};

const status = () => git.status().then((result) => console.log(result));
const add = () => git.addRemote();
const checkout = (branch) => git().checkoutBranch(branch);

module.exports = {
  getCurrentBranch,
  status,
  add,
  checkout,
};
