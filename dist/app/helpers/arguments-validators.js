"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJSorTS = exports.checkNameFormat = void 0;
const chalk_1 = __importDefault(require("chalk"));
function checkNameFormat(value, previous) {
    const packageJsonNameRegexp = /^(?:(?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?\/[a-z0-9-._~])|[a-z0-9-~])[a-z0-9-._~]*$/g;
    if (packageJsonNameRegexp.test(value)) {
        return value;
    }
    console.log(chalk_1.default.red.bold("\nError : Incorrect format for name!"));
    console.log("\nPlease, only 2 main formats", chalk_1.default.yellow.bold("(lowercase only)"), "are supported for the project name: ");
    console.log(`${chalk_1.default.yellow.bold("1/")}
      - Starting with "@" followed by an alphanumeric string with optional hyphens, tildes, asterisks, and underscores (zero or more repetitions), 
      - then a slash ("/"), 
      - and finally another alphanumeric string with optional hyphens, dots, and tildes (zero or more repetitions)`);
    console.log(`${chalk_1.default.yellow.bold("2/")}
      - Starting with an alphanumeric character with optional hyphens and tildes (zero or more repetitions), 
      - followed by zero or more repetitions of alphanumeric characters, hyphens, dots, and tildes`);
    process.exit(1);
}
exports.checkNameFormat = checkNameFormat;
function isJSorTS(value, previous) {
    if (value.toLowerCase() !== "js" && value.toLowerCase() !== "ts") {
        console.log(chalk_1.default.red("Unknown programming language: " +
            value +
            ".\nValues must be 'js' or 'ts'"));
        process.exit(1);
    }
    return value;
}
exports.isJSorTS = isJSorTS;
