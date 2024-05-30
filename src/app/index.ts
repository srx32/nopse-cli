#! /usr/bin/env node

import chalk from "chalk";
import { Command } from "commander";

import createNodeProject from "./helpers/create-command";
import { checkNameFormat, isJSorTS } from "./helpers/arguments-validators";
import promptUser from "./helpers/prompter";

const program = new Command();

console.log(
  chalk.cyan(
    "-----------------------------------\nSTARTING PROGRAM\n-----------------------------------"
  )
);

program
  .name("nopse")
  .description("CLI to set up a NodeJS project")
  .version("1.0.9");

// CREATE COMMAND HANDLER
program
  .command("create")
  .description("Create a NodeJS project")
  .argument("[name]", "Name of the project", checkNameFormat)

  .option(
    "-l, --language <language>",
    "Programming language to use",
    isJSorTS,
    "js"
  )
  .option("-e, --express", "Add express package to the project")
  .option("-gi, --git-init", "Initialize git repository")

  .action(async (name, options) => {
    let projectName;
    let language;
    let isExpressServer;
    let initGit;

    if (name === undefined) {
      const response = await promptUser();

      projectName = String(response.name);
      language = String(response.language);
      isExpressServer = Boolean(response.express);
      initGit = Boolean(response.gitInit);

      checkNameFormat(projectName, null);
    }
    // 'name' is defined
    else {
      projectName = String(name);
      language = String(options.language);
      isExpressServer = Boolean(options.express);
      initGit = Boolean(options.gitInit);
    }

    await createNodeProject(projectName, language, isExpressServer, initGit);
  });

program.parse();
