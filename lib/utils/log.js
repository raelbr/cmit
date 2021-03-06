const signale = require("signale");
const colors = require("colors");
const indent = "  ";
const gitIndexes = {
  R: "Renamed",
  M: "Modified",
  D: "Deleted",
  C: "Created",
  "?": "Untracked",
  " ": "Modified",
};
const formatFileRow = (file = {}) => {
  return `${indent}${file.path} (${gitIndexes[file.index]})\n`;
};
const gitStatus = (title, files = [], color) => {
  !!title && signale.log(`${title} (${files.length}):`);
  const filesLog = files.reduce((msg, file) => {
    return msg + formatFileRow(file);
  }, "");
  signale.log(colors[color](filesLog));
};

module.exports = {
  error: (errorMessage) => signale.error(errorMessage),
  success: (successMessage) => signale.success(successMessage),
  info: (message) => signale.info(message),
  msg: (message) => signale.log(message),
  color: (color, message) => signale.log(colors[color](message)),
  gitStatus,
  pending: (message) => signale.pending(message),
};
