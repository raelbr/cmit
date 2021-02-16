const git = require("./git");
const log = require("../utils/log");
const { refresh, br } = require("../utils/interface");
const { displayTitle } = require("../utils/interface");
const { runInquirer, questions } = require("./inquirer");

const showCommitMessage = (message) => {
  br();
  log.msg("Commit message:");
  log.color("cyan", `"${message}"`);
};

const getMainActions = (handleAction) => ({
  /**
   * ADD
   */
  add: handleAction(
    ({ finish }) => {
      git.add();
      finish();
    },
    {
      successMessage: "Changes Added and now are Staged!",
    }
  ),
  /**
   * COMMIT
   */
  commit: handleAction(({ data, finish }) => {
    refresh();
    displayTitle("Commit Changes");
    runInquirer(questions.commit, (data) => {
      const commitMessage = git.getCommitMessage(data);
      showCommitMessage(commitMessage);
      br();
      runInquirer(questions.commitConfirm, ({ confirmCommit }) => {
        if (confirmCommit) {
          git.commit(confirmCommit).then(() => {
            finish(() => {
              log.success("Changes commited!");
              showCommitMessage(commitMessage);
            }).catch(() => {
              finish(() => {
                log.error("An error has occurred");
              });
            });
          });
        } else {
          finish(() => {
            log.msg("Commit aborted!");
          });
        }
      });
    });
  }),
  /**
   * STATUS
   */
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
