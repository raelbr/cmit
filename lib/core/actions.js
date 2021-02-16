const git = require("./git");
const log = require("../utils/log");
const { refresh, br } = require("../utils/interface");
const { displayTitle } = require("../utils/interface");
const { runInquirer, questions } = require("./inquirer");

const getMainActions = (handleAction) => ({
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
      br();
      log.msg("Commit message:");
      log.color("cyan", `"${commitMessage}"`);
      br();
      runInquirer(questions.commitConfirm, ({ commitConfirm }) => {
        finish(() => {
          log.success("Changes commited!");
          br();
          log.msg("Commited with message:");
          log.color("cyan", `"${commitMessage}"`);
        });
      });
    });
  }),
});

module.exports = {
  getMainActions,
};
