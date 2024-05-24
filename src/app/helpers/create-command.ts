import chalk from "chalk";

import fs from "node:fs/promises";
import path from "node:path";
import { exec } from "node:child_process";
import { promisify } from "node:util";

async function createNodeProject(
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
        templatePath = path.join(
          __dirname,
          "..",
          "..",
          "templates",
          "js_express"
        );
      } else {
        templatePath = path.join(__dirname, "..", "..", "templates", "js");
      }
    }
    // language === 'ts'
    else {
      if (isExpressServer) {
        templatePath = path.join(
          __dirname,
          "..",
          "..",
          "templates",
          "ts_express"
        );
      } else {
        templatePath = path.join(__dirname, "..", "..", "templates", "ts");
      }
    }

    // CREATING PROJECT FOLDER
    await fs.mkdir(folderPath);

    console.log(chalk.green.bold("\nCreated project folder : " + name));

    // COPYING FILES IN PROJECT FOLDER
    console.log(chalk.yellow("\nCreating project files..."));

    await fs.cp(templatePath, folderPath, {
      recursive: true,
      filter(source, destination) {
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

    console.log(chalk.green.bold("All project files successfuly created."));

    // UPDATING package.json WITH THE NAME OF THE PROJECT
    console.log(chalk.yellow("\nUpdating 'package.json'..."));

    const packageJsonPath = path.join(folderPath, "package.json");
    const packageJsonText = await fs.readFile(packageJsonPath, {
      encoding: "utf8",
    });

    const packageJsonObject = JSON.parse(packageJsonText);

    packageJsonObject.name = name;
    const packageJsonTextUpdated = JSON.stringify(packageJsonObject, null, 2);

    fs.writeFile(packageJsonPath, packageJsonTextUpdated);

    console.log(chalk.green.bold("'package.json' successfully updated"));

    // RUNNING SOME COMMANDS
    // Making 'exec' function return a promise
    const execPromisifed = promisify(exec);

    // INSTALLING NPM PACKAGES
    console.log(chalk.yellow("\nInstalling packages..."));

    // Running "npm install" command to install the packages
    const { stdout, stderr } = await execPromisifed("npm install", {
      cwd: folderPath,
    });

    if (stderr) {
      console.error(
        chalk.red.bold(
          `An error occured when installing npm packages : \n${stderr}`
        )
      );

      process.exit(1);
    }

    console.log(chalk.green.bold("Packages installed successfully."));

    // INITIALIZING GIT REPO
    if (initGit) {
      console.log(chalk.yellow("\nInitializing git repo..."));

      // Running "git init" command to initialize a git repo
      const { stdout, stderr } = await execPromisifed("git init", {
        cwd: folderPath,
      });

      if (stderr) {
        console.error(
          chalk.red.bold(
            `An error occured when initialising git repo : \n${stderr}`
          )
        );
      } else {
        console.log(chalk.green.bold("Git repo initialized."));
      }
    }

    console.log(
      chalk.green.bold("\n✅ Project '" + name + "' successfully created!")
    );
  } catch (error: any) {
    if (
      error.errno &&
      error.errno === -17 &&
      error.code &&
      error.code === "EEXIST"
    ) {
      console.log(
        chalk.red.bold(
          "\nError: The project folder '" + name + "' already exists!"
        )
      );
    } else {
      console.error(error);
    }

    process.exit(1);
  }
}

export default createNodeProject;
