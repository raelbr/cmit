const git = require("./git");
const log = require("../utils/log");
const { displayMainOptions, caca } = require("./main");
const { refresh, br } = require("../utils/interface");
const { displayTitle } = require("../utils/interface");
const { runInquirer, questions } = require("./inquirer");

const runMainAction = (actionName) => {
  const action = mainActions[actionName];
  !!action
    ? action(() => {
        displayMainOptions();
      })
    : (() => {
        refresh(() => {
          log.error("This option is not available yet");
        });
        displayMainOptions();
      })();
};

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
    // console.log(displayMainOptions, caca);
    action({
      data,
      finish: (displayOnRefresh) => {
        refresh(() => {
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

const mainActions = {
  add: handleAction(
    ({ finish }) => {
      git.add();
      finish();
    },
    {
      successMessage: "Changes Added and now are Staged!",
    }
  ),
  commit: handleAction(({ data, finish }) => {
    refresh();
    displayTitle("Commit Changes");
    runInquirer(questions.commit, (data) => {
      const commitMessage = git.getCommitMessage(data);
      finish(() => {
        log.success("Changes commited!");
        br();
        log.msg("Commited with message:");
        log.color("yellow", `"${commitMessage}"`);
      });
    });
  }),
};

module.exports = {
  mainActions,
  runMainAction,
};
