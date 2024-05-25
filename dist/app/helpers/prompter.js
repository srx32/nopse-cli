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
const prompts_1 = __importDefault(require("prompts"));
function promptUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const questions = [
            {
                type: "text",
                name: "name",
                message: "Name of the project : ",
            },
            {
                type: "select",
                name: "language",
                message: "Choose the language : ",
                choices: [
                    {
                        title: "JS",
                        description: "Configure the project for JavaScript",
                        value: "js",
                    },
                    {
                        title: "TS",
                        description: "Configure the project for TypeScript",
                        value: "ts",
                    },
                ],
            },
            {
                type: "toggle",
                name: "express",
                message: "Add expres package to the project ?",
                inactive: "no",
                active: "yes",
            },
            {
                type: "toggle",
                name: "gitInit",
                message: "Initialize git repository ?",
                inactive: "no",
                active: "yes",
            },
        ];
        const response = yield (0, prompts_1.default)(questions, {
            onCancel: () => process.exit(0),
        });
        console.log(response);
        return response;
    });
}
exports.default = promptUser;
