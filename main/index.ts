#! /usr/bin/env node

import chalk from "chalk";
import { Command } from "commander";

import fs from "node:fs/promises";
import path from "node:path";
import { exec } from "node:child_process";

const program = new Command();

// const starterPackages: string[] = [];

console.log(
  "-----------------------------------\nSTARTING PROGRAM\n-----------------------------------"
);

function isJSorTS(value: string, previous: any) {
  if (value.toLowerCase() !== "js" && value.toLowerCase() !== "ts") {
    console.log(
      chalk.red(
        "Unknown programming language: " +
          value +
          ".\nValues must be 'js' or 'ts'"
      )
    );

    process.exit(1);
  }

  return value;
}

program
  .name("no-name")
  .description("CLI to create a NodeJS project for my needs")
  .version("0.8.0");

program
  .command("create")
  .description("Create a NodeJS project")
  .argument("<projectName>", "Name of the project")
  .option(
    "-l, --lang <language>",
    "Programming language to use",
    isJSorTS,
    "js"
  )
  .option("-e, --express", "Add express package to the project")
  .option("-gi, --git-init", "Initialise git repository")
  // .option(
  //   "-p, --package <packages...>",
  //   "Starter packages to install. Only available packages are : morgan, dotenv, cors",
  //   (value, previous) => {
  //     if (value === "morgan" || value === "dotenv" || value === "cors") {
  //       starterPackages.push(value);
  //     }

  //     return starterPackages;
  //   }
  // )
  .action(async (projectName, options) => {
    console.log("The project name is: " + projectName);
    console.log(
      "With the following options: " + JSON.stringify(options, null, 2)
    );
  });

// program
//   .option("-gi, --git-init", "Initialise git repository")
//   .option("-p, --package <packages...>", "Starter packages to install");

program.parse();

const options = program.opts();
console.log(
  "The non command related options are : " + JSON.stringify(options, null, 2)
);
