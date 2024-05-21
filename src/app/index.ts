#! /usr/bin/env node

import chalk from "chalk";
import { Command } from "commander";

import fs from "node:fs/promises";
import path from "node:path";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const program = new Command();

// const starterPackages: string[] = [];

console.log(
  chalk.cyan(
    "-----------------------------------\nSTARTING PROGRAM\n-----------------------------------"
  )
);

function checkNameFormat(value: string, previous: any) {
  const packageJsonNameRegexp =
    /^(?:(?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?\/[a-z0-9-._~])|[a-z0-9-~])[a-z0-9-._~]*$/g;

  if (packageJsonNameRegexp.test(value)) {
    return value;
  }

  console.log(
    chalk.red(chalk.bold("\nError : Incorrect format for projectName!"))
  );

  console.log(
    "\nPlease, only 2 main formats",
    chalk.yellow(chalk.bold("(lowercase only)")),
    "are supported for the project name: "
  );
  console.log(
    `${chalk.yellow(chalk.bold("1/"))}
    - Starting with "@" followed by an alphanumeric string with optional hyphens, tildes, asterisks, and underscores (zero or more repetitions), 
    - then a slash ("/"), 
    - and finally another alphanumeric string with optional hyphens, dots, and tildes (zero or more repetitions)`
  );
  console.log(
    `${chalk.yellow(chalk.bold("2/"))}
    - Starting with an alphanumeric character with optional hyphens and tildes (zero or more repetitions), 
    - followed by zero or more repetitions of alphanumeric characters, hyphens, dots, and tildes`
  );

  process.exit(1);
}

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
  .argument("<name>", "Name of the project", checkNameFormat)
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
    // console.log("Creating project '" + name + "'");
    // console.log(
    //   "With the following options: " + JSON.stringify(options, null, 2)
    // );

    const projectName = String(name);
    const language = String(options.lang);
    const isExpressServer = Boolean(options.express);
    const initGit = Boolean(options.gitInit);

    // console.log(projectName, language, isExpressServer, initGit);

    await generateNodeProject(projectName, language, isExpressServer, initGit);
  });

async function generateNodeProject(
  name: string,
  language: string,
  isExpressServer: boolean,
  initGit: boolean
) {
  try {
    console.log(chalk.yellow("\nCreating project '" + name + "'..."));

    // Getting and normalizing the current working directory
    const cwdPath = path.normalize(process.cwd());

    // Setting up the project folder path
    const folderPath = path.join(cwdPath, name);

    // Setting up the template path (folder to be copied) based on language and express option
    let templatePath = "";

    if (language === "js") {
      if (isExpressServer) {
        templatePath = path.join(__dirname, "..", "templates", "js_express");
      } else {
        templatePath = path.join(__dirname, "..", "templates", "js");
      }
    }
    // language === 'ts'
    else {
      if (isExpressServer) {
        templatePath = path.join(__dirname, "..", "templates", "ts_express");
      } else {
        templatePath = path.join(__dirname, "..", "templates", "ts");
      }
    }

    //   await fs.access(folderPath);

    // console.log(folderPath);

    // CREATING PROJECT FOLDER
    await fs.mkdir(folderPath);

    console.log(chalk.green(chalk.bold("\nCreated project folder : " + name)));

    // COPYING FILES IN PROJECT FOLDER
    console.log(chalk.yellow("\nCreating project files..."));

    await fs.cp(templatePath, folderPath, {
      recursive: true,
      filter(source, destination) {
        // console.log("Source: " + source);
        // console.log("Destination: " + destination);

        // Display should look like :  "CRETAED - projectName/file.js", "CREATED - projectName/subfolder/file.js"
        const fileRelativePath = name + destination.split(name)[1];
        console.log(chalk.green("CREATED") + " - " + fileRelativePath);

        // Prevents "node_modules" folder and "package-lock.json" file from being copied
        // Might not be necessary after build. But just in case
        if (
          source.includes("node_modules") ||
          source.includes("package-lock.json")
        ) {
          return false;
        } else {
          return true;
        }
      },
    });

    console.log(
      chalk.green(chalk.bold("All project files successfuly created."))
    );

    // UPDATING package.json WITH THE NAME OF THE PROJECT
    console.log(chalk.yellow("\nUpdating 'package.json'..."));

    const packageJsonPath = path.join(folderPath, "package.json");
    const packageJsonText = await fs.readFile(packageJsonPath, {
      encoding: "utf8",
    });

    // console.log(packageJsonText);
    const packageJsonObject = JSON.parse(packageJsonText);

    packageJsonObject.name = name;
    const packageJsonTextUpdated = JSON.stringify(packageJsonObject, null, 2);
    // console.log(packageJsonTextUpdated);

    fs.writeFile(packageJsonPath, packageJsonTextUpdated);

    console.log(chalk.green(chalk.bold("'package.json' successfully updated")));

    // RUNNING SOME COMMANDS
    // Making 'exec' function return a promise
    const execPromisifed = promisify(exec);

    // INSTALLING NPM PACKAGES
    console.log(chalk.yellow("\nInstalling packages..."));

    // Running "npm install" command to install the packages
    const { stdout, stderr } = await execPromisifed("npm install", {
      cwd: folderPath,
    });
    // console.log(`stdout: ${stdout}`);
    // console.error(`stderr: ${stderr}`);

    if (stderr) {
      console.error(
        chalk.red(
          chalk.bold(
            `An error occured when installing npm packages : \n${stderr}`
          )
        )
      );

      process.exit(1);
    }

    console.log(chalk.green(chalk.bold("Packages installed successfully.")));

    // INITIALIZING GIT REPO
    if (initGit) {
      console.log(chalk.yellow("\nInitializing git repo..."));

      // Running "git init" command to initialize a git repo
      const { stdout, stderr } = await execPromisifed("git init", {
        cwd: folderPath,
      });
      // console.log(`stdout: ${stdout}`);
      // console.error(`stderr: ${stderr}`);

      if (stderr) {
        console.error(
          chalk.red(
            chalk.bold(
              `An error occured when initialising git repo : \n${stderr}`
            )
          )
        );
      } else {
        console.log(chalk.green(chalk.bold("Git repo initialized.")));
      }
    }

    console.log(
      chalk.green(chalk.bold("\n✅ Project '" + name + "' successfully created!"))
    );
  } catch (error: any) {
    if (
      error.errno &&
      error.errno === -17 &&
      error.code &&
      error.code === "EEXIST"
    ) {
      console.log(
        chalk.red(
          chalk.bold(
            "\nError: The project folder '" + name + "' already exists!"
          )
        )
      );
    } else {
      console.error(error);
    }

    process.exit(1);
  }
}

// program
//   .option("-gi, --git-init", "Initialise git repository")
//   .option("-p, --package <packages...>", "Starter packages to install");

program.parse();

// const options = program.opts();
// console.log(
//   "The non command related options are : " + JSON.stringify(options, null, 2)
// );

// Execute an npm command
// npm i express morgan cors dotenv
// npm i -D typescript @types/node ts-node nodemon @types/express @types/morgan @types/cors
