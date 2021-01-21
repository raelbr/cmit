const colors = require("colors");
const DEFAULT_COLOR = "white";
const packageJson = require("../../package.json");

const displayDiv = (content = "", color = DEFAULT_COLOR, divChar = "-") => {
  const { length } = content;
  console.log(colors[color](String(divChar).repeat(length)));
};

const displayBlock = (content, color = DEFAULT_COLOR, divChar) => {
  displayDiv(content, color, divChar);
  console.log(colors[color](content));
  displayDiv(content, color, divChar);
};

const getVersion = () => {
  return packageJson.version;
};

const displayHeader = () => {
  displayBlock(
    `Welcome to cmit ${getVersion()} ** Work in Progress **`,
    "yellow"
  );
};

const br = () => {
  console.log("");
};

const clear = () => {
  console.clear();
};

const refresh = () => {
  clear();
  displayHeader();
  br();
};

module.exports = {
  clear,
  refresh,
  displayDiv,
  displayBlock,
  getVersion,
  br,
};
