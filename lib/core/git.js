import { exec } from "child_process";

export const getCurrentBranch = async (label = "Current Branch:") => {
  exec("git rev-parse --abbrev-ref HEAD", (error, stdout, stderror) => {});
};
