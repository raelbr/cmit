const colors = require("colors");
const packageJson = require("../../package.json");
// const git = require("../core/git");
const log = require("./log");

// Constants:
const DEFAULT_COLOR = "white";
const TITLE_COLOR = "cyan";
const MAIN_BRANCH = "master";

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
  console.log("");
};

const clear = () => {
  console.clear();
};

const displayTitle = (title) => {
  console.log(colors[TITLE_COLOR](title.toUpperCase()));
  displayDiv(title, TITLE_COLOR);
  br();
};

const displayGitInfos = () => {
  const content = [];
  // Current Branch:
  // console.log(git.getCurrentBranch());
  const currentBranch = "master";
  const branchBadge = currentBranch === MAIN_BRANCH ? "⭐" : "⇌";
  content.push(colors.magenta(`${branchBadge} ${currentBranch}`));
  content.push(`(5) staged (2) added`);
  console.log(...content);
};

const refresh = (runBefore) => {
  clear();
  displayHeader();
  if (!!runBefore) {
    br();
    runBefore();
  }
  br();
  displayGitInfos();
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
