"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCodeCommitRepository = void 0;
const client_codecommit_1 = require("@aws-sdk/client-codecommit");
const shell = __importStar(require("shelljs"));
const createCodeCommitRepository = (repositoryName, folderPath, branchName, commitMessage) => __awaiter(void 0, void 0, void 0, function* () {
    const codecommit = new client_codecommit_1.CodeCommit();
    try {
        const createdRepository = yield codecommit.createRepository({ repositoryName });
        console.log(`CodeCommit repository '${repositoryName}' created successfully.`);
        yield new Promise((resolve, reject) => {
            shell.exec(`git init`, { cwd: folderPath }, (code, stdout, stderr) => {
                if (code === 0) {
                    resolve("Git initialized");
                }
                else {
                    reject(new Error("Git Initialization failed"));
                }
            });
        });
        yield new Promise((resolve, reject) => {
            shell.exec(`git add .`, { cwd: folderPath }, (code, stdout, stderr) => {
                if (code === 0) {
                    resolve("Git Add Success");
                }
                else {
                    reject(new Error("Git Add failed"));
                }
            });
        });
        yield new Promise((resolve, reject) => {
            shell.exec(`git commit -m "${commitMessage}"`, { cwd: folderPath }, (code, stdout, stderr) => {
                if (code === 0) {
                    resolve("Git Commit Success");
                }
                else {
                    console.log(code);
                    reject(new Error("Repo is UptoDate, No changes are made"));
                }
            });
        });
        yield new Promise((resolve, reject) => {
            var _a;
            shell.exec(`git remote add origin ${(_a = createdRepository === null || createdRepository === void 0 ? void 0 : createdRepository.repositoryMetadata) === null || _a === void 0 ? void 0 : _a.cloneUrlHttp}`, { cwd: folderPath }, (code, stdout, stderr) => {
                if (code === 0) {
                    resolve("Git Remote Add Origin Success");
                }
                else {
                    reject(new Error("Git Remote Add Origin failed"));
                }
            });
        });
        yield new Promise((resolve, reject) => {
            shell.exec(`git push origin ${branchName}`, { cwd: folderPath }, (code, stdout, stderr) => {
                if (code === 0) {
                    resolve("git push origin Success");
                }
                else {
                    reject(new Error("git push origin failed"));
                }
            });
        });
        console.log("Code pushed to CodeCommit repository.");
        return createdRepository;
    }
    catch (err) {
        console.log(err);
        console.log("error occured!");
    }
});
exports.createCodeCommitRepository = createCodeCommitRepository;
