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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCodebuild = void 0;
const client_codebuild_1 = require("@aws-sdk/client-codebuild");
const codeDeployConfigType_1 = require("../utils/codeDeployConfigType");
const dataType_1 = require("../customDataTypes/dataType");
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const codeDeployConfigType_2 = require("../utils/codeDeployConfigType");
const s3_resource_1 = require("./s3.resource");
const path_1 = __importDefault(require("path"));
const codeBuildDataType = __importStar(require("../customDataTypes/CodebuildParams.datatype"));
const buildSpecFilePath = "../../build-spec-files";
// these details needed to be stored in db
var codeBuildDefaultValues;
(function (codeBuildDefaultValues) {
    codeBuildDefaultValues["projectName"] = "AppBuild";
    codeBuildDefaultValues["description"] = "This project will build the application code and produce the desired build Artifacts";
    codeBuildDefaultValues["projectSourceType"] = "CODECOMMIT";
    codeBuildDefaultValues["artifactsType"] = "S3";
    codeBuildDefaultValues["codeBuildArtifactsLocation"] = "mlrepodsd121";
    // artifactsLocations="",
    codeBuildDefaultValues["ProjectEnvironmentType"] = "LINUX_CONTAINER";
    codeBuildDefaultValues["ProjectEnvironmentImage"] = "aws/codebuild/standard:5.0";
    codeBuildDefaultValues["ProjectEnvironmentComputeType"] = "BUILD_GENERAL1_SMALL";
    codeBuildDefaultValues["cloudWatchLogsStatus"] = "ENABLED";
})(codeBuildDefaultValues || (codeBuildDefaultValues = {}));
const createCodebuild = (codeBuildProjectSpec) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    const codebuild = new client_codebuild_1.CodeBuild();
    const yamlData = fs_1.default.readFileSync(path_1.default.join(__dirname, buildSpecFilePath, (0, codeDeployConfigType_1.getBuildSpecFile)(codeBuildProjectSpec.buildType)), 'utf8');
    const codeBuildParams = {
        name: (_a = codeBuildProjectSpec.name) !== null && _a !== void 0 ? _a : codeBuildDefaultValues.projectName,
        description: (_b = codeBuildProjectSpec.description) !== null && _b !== void 0 ? _b : codeBuildDefaultValues.description,
        source: {
            type: (_c = codeBuildProjectSpec.source.type) !== null && _c !== void 0 ? _c : codeBuildDefaultValues.projectSourceType,
            location: codeBuildProjectSpec.source.location,
            buildspec: codeBuildProjectSpec.buildType == dataType_1.BUILDTYPE.ECS ? js_yaml_1.default.dump(yamlData).replace(/\|-/, '') : js_yaml_1.default.dump(yamlData).replace(/\|/, '')
        },
        artifacts: {
            type: (_e = (_d = codeBuildProjectSpec === null || codeBuildProjectSpec === void 0 ? void 0 : codeBuildProjectSpec.artifacts) === null || _d === void 0 ? void 0 : _d.type) !== null && _e !== void 0 ? _e : codeBuildDefaultValues.artifactsType,
            location: (_g = (_f = codeBuildProjectSpec === null || codeBuildProjectSpec === void 0 ? void 0 : codeBuildProjectSpec.artifacts) === null || _f === void 0 ? void 0 : _f.location) !== null && _g !== void 0 ? _g : (_h = (yield (0, s3_resource_1.createS3Bucket)({ Bucket: "sds1212asd" })).Location) === null || _h === void 0 ? void 0 : _h.split("//")[1].split(".")[0],
        },
        environment: {
            type: (_k = (_j = codeBuildProjectSpec === null || codeBuildProjectSpec === void 0 ? void 0 : codeBuildProjectSpec.environment) === null || _j === void 0 ? void 0 : _j.type) !== null && _k !== void 0 ? _k : codeBuildDefaultValues.ProjectEnvironmentType,
            image: (_m = (_l = codeBuildProjectSpec === null || codeBuildProjectSpec === void 0 ? void 0 : codeBuildProjectSpec.environment) === null || _l === void 0 ? void 0 : _l.image) !== null && _m !== void 0 ? _m : codeBuildDefaultValues.ProjectEnvironmentImage,
            computeType: (_p = (_o = codeBuildProjectSpec === null || codeBuildProjectSpec === void 0 ? void 0 : codeBuildProjectSpec.environment) === null || _o === void 0 ? void 0 : _o.computeType) !== null && _p !== void 0 ? _p : codeBuildDefaultValues.ProjectEnvironmentComputeType,
            privilegedMode: (0, codeDeployConfigType_1.getPrivilegedMode)(codeBuildProjectSpec.buildType),
            environmentVariables: [{
                    name: "BUILD_FOLDER",
                    value: yield (0, codeDeployConfigType_2.getBuildPath)(),
                    type: codeBuildDataType.environmentVariablesType.PLAINTEXT
                }, {
                    name: "NODEJS_VERSION",
                    value: yield (0, codeDeployConfigType_2.getNodeVersion)(),
                    type: codeBuildDataType.environmentVariablesType.PLAINTEXT
                }],
        },
        serviceRole: codeBuildProjectSpec.serviceRole,
        logsConfig: {
            cloudWatchLogs: {
                status: (_s = (_r = (_q = codeBuildProjectSpec.logsConfig) === null || _q === void 0 ? void 0 : _q.cloudWatchLogs) === null || _r === void 0 ? void 0 : _r.status) !== null && _s !== void 0 ? _s : codeBuildDefaultValues.cloudWatchLogsStatus
            }
        }
    };
    const result = yield codebuild.createProject(codeBuildParams);
    return { result, buildType: codeBuildProjectSpec.buildType };
});
exports.createCodebuild = createCodebuild;
