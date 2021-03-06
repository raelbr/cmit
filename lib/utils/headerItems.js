const colors = require("colors");
const store = require("../core/store");
const git = require("../core/git");
const log = require("./log");

const MAIN_BRANCH = "main";
const MAIN_BRANCH_BADGE = "⭐";
const DEFAULT_BRANCH_BADGE = "";

const displayFormatedHeaderItem = (title, msg) => {
  log.msg(`${colors.gray(`[${title}]:`)} ${msg}`);
};

const displayFormatedGitBranch = (current) => {
  const branchBadge =
    current === MAIN_BRANCH ? MAIN_BRANCH_BADGE : DEFAULT_BRANCH_BADGE;
  displayFormatedHeaderItem(
    "branch",
    `${colors.magenta(`${branchBadge} ${current}`)}`
  );
};

const getFormatedStageCount = (count, title) => {
  return `${!!count ? colors.yellow.bold(count) : 0} ${title}`;
};

const displayGitStatusSummary = (staged, files) => {
  const stagedCount = staged.length;
  const notStagedCount = files.length - stagedCount;
  const stagedMessage = getFormatedStageCount(stagedCount, "Staged");
  const notStagedMessage = getFormatedStageCount(notStagedCount, "Not staged");
  displayFormatedHeaderItem("changes", `${stagedMessage}, ${notStagedMessage}`);
};

const displayHeaderInfos = async () => {
  const gitStatus = await git.status();
  store.set("gitStatus", gitStatus);
  const { current = "", staged = [], files = [] } = gitStatus || {};
  displayFormatedGitBranch(current);
  displayGitStatusSummary(staged, files);
};

module.exports = displayHeaderInfos;
