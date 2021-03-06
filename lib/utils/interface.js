const colors = require("colors");
const log = require("./log");
const packageJson = require("../../package.json");
const displayHeaderInfos = require("./headerItems");

// Constants:
const DEFAULT_COLOR = "white";
const TITLE_COLOR = "cyan";

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

const displayMainTitle = () => {
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

const refresh = async (runBefore) => {
  clear();
  displayMainTitle();
  if (!!runBefore) {
    br();
    runBefore();
  }
  br();
  await displayHeaderInfos();
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
