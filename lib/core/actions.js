const git = require("./git");
const log = require("../utils/log");
const { refresh, br, displayTitle } = require("../utils/interface");
const { getCurrentBranch } = require("./git");
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
  commit: handleAction(async ({ data, finish }) => {
    await refresh();
    displayTitle("Commit Changes");
    runInquirer(questions.commit, (data) => {
      const commitMessage = git.getCommitMessage(data);
      showCommitMessage(commitMessage);
      br();
      runInquirer(questions.commitConfirm, ({ confirmCommit }) => {
        if (confirmCommit) {
          try {
            git.commit(commitMessage);
            finish(() => {
              log.success("Changes commited!");
              showCommitMessage(commitMessage);
            });
          } catch (error) {
            finish(() => {
              log.error("An error has occurred");
            });
          }
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

        if (!staged.length && !notStaged.length) {
          log.msg("No Changes to commit");
          return;
        }

        // Staged:
        !!staged.length && log.gitStatus("Staged Changes", staged, "green");
        // Modified:
        !!notStaged.length && log.gitStatus("Changes", notStaged, "red");
      });
    });
  }),
  // pull: handleAction(({ data, finish }) => {
  //   // wip action
  //   finish();
  // }),
  push: handleAction(async ({ data, finish }) => {
    const result = await git.push();
    const isSuccess = !!result.pushed || !!result.update;
    finish(() => {
      if (isSuccess) {
        const isAlreadyUpdated =
          !!result.pushed.length && !!result.pushed[0].alreadyUpdated;
        const successMessage = isAlreadyUpdated
          ? "Already Updated"
          : "Changes Pushed!";
        log.success(successMessage);
      } else {
        log.error(result);
      }
    });
  }),
  // branch: handleAction(({ data, finish }) => {
  //   // wip action
  //   finish();
  // }),
});

module.exports = {
  getMainActions,
};
