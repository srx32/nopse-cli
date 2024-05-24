#! /usr/bin/env node

import chalk from "chalk";
import { Command } from "commander";

import createNodeProject from "./helpers/create-command";
import { checkNameFormat, isJSorTS } from "./helpers/arguments-validators";

const program = new Command();

console.log(
  chalk.cyan(
    "-----------------------------------\nSTARTING PROGRAM\n-----------------------------------"
  )
);

program
  .name("nps")
  .description("CLI to set up a NodeJS project")
  .version("1.0.0");

// CREATE COMMAND HANDLER
program
  .command("create")
  .description("Create a NodeJS project")
  .argument("<name>", "Name of the project", checkNameFormat)

  .option(
    "-l, --lang <language>",
    "Programming language to use",
    isJSorTS,
    "js"
  )
  .option("-e, --express", "Add express package to the project")
  .option("-gi, --git-init", "Initialise git repository")

  .action(async (name, options) => {
    const projectName = String(name);
    const language = String(options.lang);
    const isExpressServer = Boolean(options.express);
    const initGit = Boolean(options.gitInit);

    await createNodeProject(projectName, language, isExpressServer, initGit);
  });

program.parse();
