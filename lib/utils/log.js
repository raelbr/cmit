const signale = require("signale");
const { Signale } = require("signale");
const colors = require("colors");

module.exports = {
  error: (errorMessage) => signale.error(errorMessage),
  success: (successMessage) => signale.success(successMessage),
  info: (message) => signale.info(message),
  msg: (message) => signale.log(message),
  color: (color, message) => signale.log(colors[color](message)),
};
