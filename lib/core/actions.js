const git = require("./git");
const log = require("../utils/log");
const { refresh } = require("../utils/interface");
const { br } = require("../utils/interface");

const handleAction = (
  action = () => null,
  {
    successMessage,
    errorMessage = "An error has occurred",
    onError = () => null,
  } = {}
) => async (callBack = () => null) => {
  try {
    await action();
    refresh();
    !!successMessage && log.success(successMessage);
    br();
    callBack();
  } catch (error) {
    !!errorMessage && log.error(errorMessage);
    onError();
  }
};

const mainActions = {
  add: handleAction(
    () => {
      git.add();
    },
    {
      successMessage: "Changes Added and now are Staged!",
    }
  ),
  commit: handleAction((data) => {
    console.log(data);
  }),
};

module.exports = {
  mainActions,
};
