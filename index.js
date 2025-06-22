#!/usr/bin/env node
import simpleGit from "simple-git";
import chalk from "chalk";
import path from "path";

(async () => {
  const git = simpleGit();
  let status;
  try {
    status = await git.status();
  } catch (err) {
    console.error(
      chalk.red("Error: Not a git repository or git is not installed.")
    );
    process.exit(2);
  }

  // Check only added or modified files (not deleted)
  const stagedFiles = status.files
    .filter((file) => ["A", "M"].includes(file.index)) // index shows the staged change type
    .map((file) => file.path);

  const sensitivePatterns = [
    /^\.env(\..+)?$/i,
    /^\.?env$/i,
    /\.pem$/i,
    /\.key$/i,
    /\.crt$/i,
    /id_rsa$/i,
    /id_rsa\.pub$/i,
    /credentials\.json$/i,
    /firebase.*\.json$/i,
    /serviceAccount.*\.json$/i,
    /secrets?\..*$/i,
    /config\/secrets.*$/i,
    /\.p12$/i,
    /\.keystore$/i,
  ];

  const matched = stagedFiles.filter((file) => {
    const base = path.basename(file);
    return sensitivePatterns.some((pattern) => pattern.test(base));
  });

  if (matched.length > 0) {
    console.log(
      chalk.red.bold("⛔  Potential Security Risk: Sensitive files are staged!")
    );
    matched.forEach((file) => {
      console.log(chalk.red(` - ${file}`));
    });
    console.log(
      chalk.yellow(
        "\n❗ Please unstage or remove these files from the commit to avoid leaking sensitive information."
      )
    );
    process.exit(1);
  } else {
    process.exit(0);
  }
})();
