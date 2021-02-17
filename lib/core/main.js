var log = require("../utils/log");
const { runInquirer, questions } = require("./inquirer");
const { getMainActions } = require("./actions");
const { refresh } = require("../utils/interface");

const handleAction = (
  action = () => null,
  {
    successMessage,
    errorMessage = "An error has occurred",
    onError = () => null,
    backToMainMenu = true,
  } = {}
) => (data, callBack = () => null) => {
  try {
    action({
      data,
      finish: async (displayOnRefresh) => {
        await refresh(() => {
          !!successMessage && log.success(successMessage);
          !!displayOnRefresh && displayOnRefresh();
        });
        callBack();
        !!backToMainMenu && displayMainOptions();
      },
    });
  } catch (error) {
    !!errorMessage && log.error(error);
    onError();
  }
};

const runMainAction = (actionName, finish) => {
  const action = getMainActions(handleAction)[actionName];
  !!action
    ? action(() => {
        finish();
      })
    : (async () => {
        await refresh(() => {
          log.error("This option is not available yet");
        });
        finish();
      })();
};

const displayMainOptions = () =>
  runInquirer(questions.main, ({ action }) => {
    if (action !== "quit") {
      runMainAction(action, displayMainOptions);
    }
  });

const init = async () => {
  await refresh();
  displayMainOptions();
};

module.exports = {
  displayMainOptions,
  handleAction,
  init,
};
