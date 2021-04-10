const log = require("./log");

const handleFatalError = (errorMsg) => {
  log.error(errorMsg);
  process.exit(1);
};

module.exports = {
  handleFatalError,
};
