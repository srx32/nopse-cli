"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const promises_1 = __importDefault(require("node:fs/promises"));
// import fs from "fs-extra";
const node_path_1 = __importDefault(require("node:path"));
const node_child_process_1 = require("node:child_process");
const node_util_1 = require("node:util");
const recursive_copy_1 = __importDefault(require("recursive-copy"));
function createNodeProject(name, language, isExpressServer, initGit) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(chalk_1.default.yellow("\nCreating project '" + name + "'..."));
            // Getting and normalizing the current working directory
            const cwdPath = node_path_1.default.normalize(process.cwd());
            // Setting up the project folder path
            const folderPath = node_path_1.default.join(cwdPath, name);
            // Setting up the template path (folder to be copied) based on language and express option
            let templatePath = "";
            if (language === "js") {
                if (isExpressServer) {
                    templatePath = node_path_1.default.join(__dirname, "..", "..", "templates", "js_express");
                }
                else {
                    templatePath = node_path_1.default.join(__dirname, "..", "..", "templates", "js");
                }
            }
            // language === 'ts'
            else {
                if (isExpressServer) {
                    templatePath = node_path_1.default.join(__dirname, "..", "..", "templates", "ts_express");
                }
                else {
                    templatePath = node_path_1.default.join(__dirname, "..", "..", "templates", "ts");
                }
            }
            // CREATING PROJECT FOLDER
            yield promises_1.default.mkdir(folderPath);
            console.log(chalk_1.default.green.bold("\nCreated project folder : " + name));
            // COPYING FILES IN PROJECT FOLDER
            console.log(chalk_1.default.yellow("\nCreating project files..."));
            // const files = await fs.readdir(templatePath, { recursive: true });
            // console.log("\nFiles are : " + files + "\n");
            const results = yield (0, recursive_copy_1.default)(templatePath, folderPath, {
                dot: true,
                filter: ["**/*", "!**/node_modules/**", "!**/package-lock.json"],
            }).on(recursive_copy_1.default.events.COPY_FILE_COMPLETE, (copyOperation) => {
                const destination = copyOperation.dest;
                // Display should look like :  "CREATED - projectName/file.js", "CREATED - projectName/subfolder/file.js"
                const fileRelativePath = name + destination.split(name)[1];
                console.log(chalk_1.default.green("CREATED") + " - " + fileRelativePath);
            });
            // console.info("Copied " + results.length + " files");
            // console.log(JSON.stringify(results, null, 2));
            // await fs.cp(templatePath, folderPath, {
            //   recursive: true,
            //   filter(source, destination) {
            //     // Display should look like :  "CREATED - projectName/file.js", "CREATED - projectName/subfolder/file.js"
            //     // console.log("Source : " + source);
            //     const fileRelativePath = name + destination.split(name)[1];
            //     console.log(chalk.green("CREATED") + " - " + fileRelativePath);
            //     // Prevents "node_modules" folder and "package-lock.json" file from being copied
            //     // Might not be necessary after build. But just in case
            //     if (
            //       source.includes("node_modules") ||
            //       source.includes("package-lock.json")
            //     ) {
            //       return false;
            //     } else {
            //       return true;
            //     }
            //   },
            // });
            console.log(chalk_1.default.green.bold("All project files successfuly created."));
            // UPDATING package.json WITH THE NAME OF THE PROJECT
            console.log(chalk_1.default.yellow("\nUpdating 'package.json'..."));
            const packageJsonPath = node_path_1.default.join(folderPath, "package.json");
            const packageJsonText = yield promises_1.default.readFile(packageJsonPath, {
                encoding: "utf8",
            });
            const packageJsonObject = JSON.parse(packageJsonText);
            packageJsonObject.name = name;
            const packageJsonTextUpdated = JSON.stringify(packageJsonObject, null, 2);
            promises_1.default.writeFile(packageJsonPath, packageJsonTextUpdated);
            console.log(chalk_1.default.green.bold("'package.json' successfully updated"));
            // RUNNING SOME COMMANDS
            // Making 'exec' function return a promise
            const execPromisifed = (0, node_util_1.promisify)(node_child_process_1.exec);
            // INSTALLING NPM PACKAGES
            console.log(chalk_1.default.yellow("\nInstalling packages..."));
            // Running "npm install" command to install the packages
            const { stdout, stderr } = yield execPromisifed("npm install", {
                cwd: folderPath,
            });
            if (stderr) {
                console.error(chalk_1.default.red.bold(`An error occured when installing npm packages : \n${stderr}`));
                process.exit(1);
            }
            console.log(chalk_1.default.green.bold("Packages installed successfully."));
            // INITIALIZING GIT REPO
            if (initGit) {
                console.log(chalk_1.default.yellow("\nInitializing git repo..."));
                // Running "git init" command to initialize a git repo
                const { stdout, stderr } = yield execPromisifed("git init", {
                    cwd: folderPath,
                });
                if (stderr) {
                    console.error(chalk_1.default.red.bold(`An error occured when initialising git repo : \n${stderr}`));
                }
                else {
                    console.log(chalk_1.default.green.bold("Git repo initialized."));
                }
            }
            console.log(chalk_1.default.green.bold("\n✅ Project '" + name + "' successfully created!"));
        }
        catch (error) {
            if (error.errno &&
                error.errno === -17 &&
                error.code &&
                error.code === "EEXIST") {
                console.log(chalk_1.default.red.bold("\nError: The project folder '" + name + "' already exists!"));
            }
            else {
                console.error(error);
            }
            process.exit(1);
        }
    });
}
exports.default = createNodeProject;
