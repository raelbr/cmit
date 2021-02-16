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
        !!commitConfirm &&
          finish(() => {
            log.success("Changes commited!");
            br();
            log.msg("Commited with message:");
            log.color("cyan", `"${commitMessage}"`);
          });
      });
    });
  }),
  status: handleAction(({ finish }) => {
    git.status((results) => {
      finish(() => {
        const { files = [] } = results || {};
        const staged = [];
        const notStaged = [];

        files.forEach((file) => {
          const target = file.working_dir === " " ? staged : notStaged;
          target.push(file);
        });

        // Staged:
        !!staged.length && log.gitStatus("Staged Changes", staged, "green");
        // Modified:
        !!notStaged.length && log.gitStatus("Changes", notStaged, "red");
      });
    });
  }),
  // push: handleAction(({ data, finish }) => {
  //   // wip action
  //   finish();
  // }),
  // repeatCommit: handleAction(({ data, finish }) => {
  //   // wip action
  //   finish();
  // }),
  // branch: handleAction(({ data, finish }) => {
  //   // wip action
  //   finish();
  // }),
});

module.exports = {
  getMainActions,
};
