const git = require("./git");
const log = require("../utils/log");
const {
  refresh,
  br,
  displayTitle,
  clear,
  loading,
} = require("../utils/interface");
const { getCurrentBranch } = require("./git");
const { runInquirer, questions } = require("./inquirer");
const { formatDateWithHours } = require("../utils/date");
const inquirer = require("inquirer");

const GIT_LOG_MAX = 20;

const showCommitMessage = (message) => {
  br();
  log.msg("Commit message:");
  log.color("cyan", `"${message}"`);
};

const displayGitLogItem = (logData, isLatest) => {
  const { hash, date, message, author_name, author_email } = logData;
  const formatedAuthor = `${log.bold(author_name)} (${author_email})`;
  const dateAndAuthor = `${formatedAuthor} on ${formatDateWithHours(date)}`;
  isLatest && log.color("red", log.bold("*last commit*"));
  log.color("yellow", dateAndAuthor);
  log.color("magenta", hash);
  log.msg(message);
  log.color("gray", "---------------");
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
  pull: handleAction(async ({ data, finish }) => {
    const response = await git.pull();
    finish(() => {
      const {
        summary: { changes, deletions, insertions },
      } = response;
      const totalChanges = changes + deletions + insertions;
      const message =
        totalChanges > 0 ? `${totalChanges} changes` : "Already updated";
      log.success(message);
    });
  }),
  push: handleAction(async ({ data, finish }) => {
    loading.display("pushing...");
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
  log: handleAction(({ finish }) => {
    git.log().then((gitLog = {}) => {
      const logList = gitLog.all || [];
      logList
        .slice(0, GIT_LOG_MAX)
        .reverse()
        .forEach((logData = {}, index) => {
          displayGitLogItem(logData, index === GIT_LOG_MAX - 1);
        });
      inquirer
        .prompt([
          {
            type: "list",
            name: "What would you like to do?",
            choices: [{ name: "Back to Main Menu" }],
          },
        ])
        .then(() => {
          finish();
        });
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
