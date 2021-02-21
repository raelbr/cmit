const colors = require("colors");
const packageJson = require("../../package.json");
const git = require("../core/git");
const log = require("./log");
const store = require("../core/store");

// Constants:
const DEFAULT_COLOR = "white";
const TITLE_COLOR = "cyan";

const MAIN_BRANCH = "main";
const MAIN_BRANCH_BADGE = "⭐";
const DEFAULT_BRANCH_BADGE = "";

const displayDiv = (content = "", color = DEFAULT_COLOR, divChar = "-") => {
  const { length } = content;
  console.log(colors[color](String(divChar).repeat(length)));
};

const displayBlock = (content, color = DEFAULT_COLOR, divChar) => {
  displayDiv(content, color, divChar);
  log.color(color, content);
  displayDiv(content, color, divChar);
};

const getVersion = () => {
  return packageJson.version;
};

const displayHeader = () => {
  displayBlock(
    `Welcome to cmit ${getVersion()} ** Work in Progress **`,
    "yellow",
    "="
  );
};

const br = () => {
  log.msg("");
};

const clear = () => {
  console.clear();
};

const displayTitle = (title) => {
  log.msg(colors[TITLE_COLOR](title.toUpperCase()));
  displayDiv(title, TITLE_COLOR);
  br();
};

const getFormatedGitBranch = (current) => {
  const branchBadge =
    current === MAIN_BRANCH ? MAIN_BRANCH_BADGE : DEFAULT_BRANCH_BADGE;
  return `[current branch]: ${colors.magenta(`${branchBadge} ${current}`)}`;
};

const getFormatedStageCount = (count, title) => {
  return `${!!count ? colors.yellow.bold(count) : 0} ${title}`;
};

const getFormatedGitStatusSummary = (staged, files) => {
  const stagedCount = staged.length;
  const notStagedCount = files.length - stagedCount;
  const stagedMessage = getFormatedStageCount(stagedCount, "Staged");
  const notStagedMessage = getFormatedStageCount(notStagedCount, "Not staged");
  return `[changes]: ${stagedMessage}, ${notStagedMessage}`;
};

const displayGitInfos = async () => {
  const gitStatus = await git.status();
  store.set("gitStatus", gitStatus);
  const { current = "", staged = [], files = [] } = gitStatus || {};
  log.msg(getFormatedGitBranch(current));
  log.msg(getFormatedGitStatusSummary(staged, files));
};

const refresh = async (runBefore) => {
  clear();
  displayHeader();
  if (!!runBefore) {
    br();
    runBefore();
  }
  br();
  await displayGitInfos();
  br();
};

module.exports = {
  clear,
  refresh,
  displayDiv,
  displayBlock,
  displayTitle,
  br,
};
