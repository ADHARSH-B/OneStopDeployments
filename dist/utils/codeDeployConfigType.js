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
exports.getPrivilegedMode = exports.getBuildPath = exports.createS3 = exports.getNodeVersion = exports.getBuildSpecFile = exports.main = void 0;
const dataType_1 = require("../customDataTypes/dataType");
const client_s3_1 = require("@aws-sdk/client-s3");
const client = new client_s3_1.S3Client({});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_s3_1.CreateBucketCommand({
        // The name of the bucket. Bucket names are unique and have several other constraints.
        // See https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html
        Bucket: "bucket-name",
    });
    try {
        const { Location } = yield client.send(command);
        console.log(`Bucket created with location ${Location}`);
    }
    catch (err) {
        console.error(err);
    }
});
exports.main = main;
// JSON data or path to JSON file
const jsonFilePath = './package.json';
const shell = __importStar(require("shelljs"));
function getBuildSpecFile(buildType) {
    switch (buildType) {
        case dataType_1.BUILDTYPE.ECS:
            return "ecs_deployment_build-spec.yaml";
        case dataType_1.BUILDTYPE.S3:
            return "angular-build-spec.yaml";
        default:
            return "angular-build-spec.yaml";
    }
}
exports.getBuildSpecFile = getBuildSpecFile;
function getNodeVersion() {
    return __awaiter(this, void 0, void 0, function* () {
        const jqCommand = `jq '.engines.node' ${jsonFilePath}`;
        return yield new Promise((resolve, reject) => {
            shell.exec(jqCommand, { cwd: "./testing" }, (code, stdout, stderr) => {
                if (code === 0) {
                    resolve(stdout);
                }
                else {
                    reject(new Error(stderr));
                }
            });
        });
    });
}
exports.getNodeVersion = getNodeVersion;
function createS3(name, enableStaticHosting) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new client_s3_1.S3Client({});
        const command = new client_s3_1.CreateBucketCommand({
            Bucket: "1212oi32oio2",
        });
        try {
            const { Location } = yield client.send(command);
            console.log(`Bucket created with location ${Location}`);
        }
        catch (err) {
            console.error(err);
        }
    });
}
exports.createS3 = createS3;
function getBuildPath() {
    return __awaiter(this, void 0, void 0, function* () {
        const jqCommand = `jq '.name' ${jsonFilePath}`;
        return yield new Promise((resolve, reject) => {
            shell.exec(jqCommand, { cwd: "./testing" }, (code, stdout, stderr) => {
                if (code === 0) {
                    resolve(stdout);
                }
                else {
                    reject(new Error(stderr));
                }
            });
        });
    });
}
exports.getBuildPath = getBuildPath;
function getPrivilegedMode(buildType) {
    switch (buildType) {
        case dataType_1.BUILDTYPE.ECS:
            return true;
        case dataType_1.BUILDTYPE.S3:
            return false;
        default:
            return false;
    }
}
exports.getPrivilegedMode = getPrivilegedMode;
