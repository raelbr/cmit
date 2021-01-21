const signale = require("signale");

module.exports = {
  error: (errorMessage) => signale.error(errorMessage),
  success: (successMessage) => signale.success(successMessage),
  info: (message) => signale.info(message),
  msg: (message) => signale.log(message),
};
