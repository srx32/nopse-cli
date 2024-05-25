#! /usr/bin/env node
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
const commander_1 = require("commander");
const create_command_1 = __importDefault(require("./helpers/create-command"));
const arguments_validators_1 = require("./helpers/arguments-validators");
const prompter_1 = __importDefault(require("./helpers/prompter"));
const program = new commander_1.Command();
console.log(chalk_1.default.cyan("-----------------------------------\nSTARTING PROGRAM\n-----------------------------------"));
program
    .name("nps")
    .description("CLI to set up a NodeJS project")
    .version("1.0.0");
// CREATE COMMAND HANDLER
program
    .command("create")
    .description("Create a NodeJS project")
    .argument("[name]", "Name of the project", arguments_validators_1.checkNameFormat)
    .option("-l, --language <language>", "Programming language to use", arguments_validators_1.isJSorTS, "js")
    .option("-e, --express", "Add express package to the project")
    .option("-gi, --git-init", "Initialize git repository")
    .action((name, options) => __awaiter(void 0, void 0, void 0, function* () {
    let projectName;
    let language;
    let isExpressServer;
    let initGit;
    if (name === undefined) {
        const response = yield (0, prompter_1.default)();
        projectName = String(response.name);
        language = String(response.language);
        isExpressServer = Boolean(response.express);
        initGit = Boolean(response.gitInit);
        (0, arguments_validators_1.checkNameFormat)(projectName, null);
    }
    // 'name' is defined
    else {
        projectName = String(name);
        language = String(options.language);
        isExpressServer = Boolean(options.express);
        initGit = Boolean(options.gitInit);
    }
    yield (0, create_command_1.default)(projectName, language, isExpressServer, initGit);
}));
program.parse();
