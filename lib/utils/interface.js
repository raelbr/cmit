const colors = require("colors");
const log = require("./log");
const packageJson = require("../../package.json");
const displayHeaderInfos = require("./headerItems");
const clear = require("clear");
var Spinner = require("cli-spinner").Spinner;

const DEFAULT_LOADING_TITLE = "loading...";

// Set spinner
var loadingSpinner = new Spinner("loading...");

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

const loading = {
  start: (title = DEFAULT_LOADING_TITLE) => {
    loadingSpinner.setSpinnerTitle(title);
    loadingSpinner.start();
  },
  stop: () => {
    loadingSpinner.stop();
  },
  display: (title = DEFAULT_LOADING_TITLE) => {
    br();
    log.msg(colors.gray(title));
  },
};

module.exports = {
  clear,
  refresh,
  displayDiv,
  displayBlock,
  displayTitle,
  br,
  loading,
};
