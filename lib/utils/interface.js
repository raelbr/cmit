const colors = require("colors");
const packageJson = require("../../package.json");
const git = require("../core/git");
const log = require("./log");

// Constants:
const DEFAULT_COLOR = "white";
const TITLE_COLOR = "cyan";
const MAIN_BRANCH = "master";

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

const displayGitInfos = async () => {
  const content = ["[current branch]:"];
  // Current Branch:
  const currentBranch = await git.getCurrentBranch();
  const branchBadge =
    currentBranch === MAIN_BRANCH ? MAIN_BRANCH_BADGE : DEFAULT_BRANCH_BADGE;
  content.push(colors.magenta(`${branchBadge} ${currentBranch}`));
  // content.push(`(5) staged (2) added`);
  console.log(...content);
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
