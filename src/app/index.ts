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
  .argument("<name>", "Name of the project")
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
  .action(async (name, options) => {
    console.log("The project name is: " + name);
    console.log(
      "With the following options: " + JSON.stringify(options, null, 2)
    );

    const projectName = String(name);
    const language = String(options.lang);
    const isExpressServer = Boolean(options.express);
    const initGit = Boolean(options.gitInit);

    console.log(projectName, language, isExpressServer, initGit);

    await generateNodeProject(projectName, language, isExpressServer, initGit);
  });

async function generateNodeProject(
  name: string,
  language: string,
  isExpressServer: boolean,
  initGit: boolean
) {
  try {
    const cwdPath = path.normalize(process.cwd());
    const folderPath = path.join(cwdPath, name);
    const tsExpressPath = path.join(__dirname, "..", "templates", "ts_express");

    //   await fs.access(folderPath);

    console.log(folderPath);

    await fs.mkdir(folderPath);

    // await fs.writeFile(path.join(__dirname, name, "text.txt"), "OK");

    // Execute an npm command
    // npm i express morgan cors dotenv
    // npm i -D typescript @types/node ts-node nodemon @types/express @types/morgan @types/cors

    await fs.cp(tsExpressPath, folderPath, {
      recursive: true,
      filter(source, destination) {
        console.log("Source: " + source);
        console.log("Destination: " + destination);

        return true;
      },
    });
    exec("npm i", { cwd: folderPath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  } catch (error) {
    console.error(error);
  }
}
// program
//   .option("-gi, --git-init", "Initialise git repository")
//   .option("-p, --package <packages...>", "Starter packages to install");

program.parse();

const options = program.opts();
console.log(
  "The non command related options are : " + JSON.stringify(options, null, 2)
);
