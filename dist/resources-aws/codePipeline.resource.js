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
exports.createPipeline = void 0;
const client_codepipeline_1 = require("@aws-sdk/client-codepipeline");
const s3_resource_1 = require("./s3.resource");
const codePipelineDataType = __importStar(require("../customDataTypes/CodePipelineParams.datatype"));
const dataType_1 = require("../customDataTypes/dataType");
var codePipelineDefaultValues;
(function (codePipelineDefaultValues) {
    codePipelineDefaultValues["pipelineName"] = "ApplicationRollout";
    codePipelineDefaultValues["pipelineArtifactType"] = "S3";
    codePipelineDefaultValues["pipelineArtifactLocation"] = "pipelineartifactbucketsdsds";
    codePipelineDefaultValues["pipelineRepoPullStageName"] = "Source";
    codePipelineDefaultValues["pipelineDeployStageName"] = "deploy";
    codePipelineDefaultValues["pipelineBuildStageName"] = "build";
    codePipelineDefaultValues["pipelineStageActionVersion"] = "1";
    codePipelineDefaultValues["pipelineSourceStageOutputArtifact"] = "sourceoutput";
    codePipelineDefaultValues["pipelineBuildStageOutputArtifact"] = "buildoutput";
    codePipelineDefaultValues["pipelineType"] = "V1";
})(codePipelineDefaultValues || (codePipelineDefaultValues = {}));
const createPipeline = (codePipelineSpec) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const stageLength = codePipelineSpec.pipeline.stages.length;
    const pipelineParams = {
        pipeline: {
            name: (_a = codePipelineSpec.pipeline.name) !== null && _a !== void 0 ? _a : codePipelineDefaultValues.pipelineName,
            roleArn: codePipelineSpec.pipeline.roleArn,
            artifactStore: {
                type: (_d = (_c = (_b = codePipelineSpec === null || codePipelineSpec === void 0 ? void 0 : codePipelineSpec.pipeline) === null || _b === void 0 ? void 0 : _b.artifactStore) === null || _c === void 0 ? void 0 : _c.type) !== null && _d !== void 0 ? _d : codePipelineDefaultValues.pipelineArtifactType,
                location: (_g = (_f = (_e = codePipelineSpec === null || codePipelineSpec === void 0 ? void 0 : codePipelineSpec.pipeline) === null || _e === void 0 ? void 0 : _e.artifactStore) === null || _f === void 0 ? void 0 : _f.location) !== null && _g !== void 0 ? _g : (_h = (yield (0, s3_resource_1.createS3Bucket)({ Bucket: "sdsd2121212" })).Location) === null || _h === void 0 ? void 0 : _h.split("//")[1].split(".")[0],
            },
            stages: codePipelineSpec.pipeline.stages.map((stage, index) => {
                var _a;
                console.log(index, index == 0 ? codePipelineDefaultValues.pipelineRepoPullStageName
                    : index == stageLength - 1 ? codePipelineDefaultValues.pipelineDeployStageName : codePipelineDefaultValues.pipelineBuildStageName);
                return {
                    name: ((_a = stage.name) !== null && _a !== void 0 ? _a : index == 0) ? codePipelineDefaultValues.pipelineRepoPullStageName
                        : index == stageLength - 1 ? codePipelineDefaultValues.pipelineDeployStageName : codePipelineDefaultValues.pipelineBuildStageName,
                    actions: stage.actions.map((action, ind) => __awaiter(void 0, void 0, void 0, function* () {
                        var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                        let stage_action = {
                            name: ((_b = action.name) !== null && _b !== void 0 ? _b : index == 0) ? codePipelineDefaultValues.pipelineRepoPullStageName + "_" + ind
                                : index == stageLength - 1 ? codePipelineDefaultValues.pipelineDeployStageName + "_" + ind : codePipelineDefaultValues.pipelineBuildStageName + "_" + ind,
                            actionTypeId: {
                                category: ((_d = (_c = action === null || action === void 0 ? void 0 : action.actionTypeId) === null || _c === void 0 ? void 0 : _c.category) !== null && _d !== void 0 ? _d : index == 0) ? codePipelineDataType.actionTypeCategory.Source
                                    : index == stageLength - 1 ? codePipelineDataType.actionTypeCategory.Deploy : codePipelineDataType.actionTypeCategory.Build,
                                owner: (_f = (_e = action === null || action === void 0 ? void 0 : action.actionTypeId) === null || _e === void 0 ? void 0 : _e.owner) !== null && _f !== void 0 ? _f : codePipelineDataType.actionOwner.AWS,
                                provider: ((_h = (_g = action === null || action === void 0 ? void 0 : action.actionTypeId) === null || _g === void 0 ? void 0 : _g.provider) !== null && _h !== void 0 ? _h : index == 0) ? codePipelineDataType.actionProviders.CodeCommit
                                    : index == stageLength - 1 ? codePipelineSpec.pipeline.buildType == dataType_1.BUILDTYPE.S3 ? codePipelineDataType.actionProviders.S3 : codePipelineDataType.actionProviders.ECS : codePipelineDataType.actionProviders.CodeBuild,
                                version: (_k = (_j = action === null || action === void 0 ? void 0 : action.actionTypeId) === null || _j === void 0 ? void 0 : _j.version) !== null && _k !== void 0 ? _k : codePipelineDefaultValues.pipelineStageActionVersion
                            },
                            // 
                            configuration: index == 0 ? Object.assign({ BranchName: "main" }, action.configuration) : index == stageLength - 1 ? Object.assign({ BucketName: (_l = (yield (0, s3_resource_1.createS3BuckerAsStatisSite)({ Bucket: "angularappbucketas1212u923" })).Location) === null || _l === void 0 ? void 0 : _l.split("//")[1].split(".")[0], Extract: "true" }, action.configuration) : Object.assign({}, action.configuration)
                        };
                        index != 0 ? stage_action.inputArtifacts = (_m = action === null || action === void 0 ? void 0 : action.inputArtifacts) !== null && _m !== void 0 ? _m : [{
                                name: index == stageLength ? codePipelineDefaultValues.pipelineBuildStageOutputArtifact : codePipelineDefaultValues.pipelineSourceStageOutputArtifact,
                            }] : undefined;
                        index != stageLength - 1 ? stage_action.outputArtifacts = (_o = action === null || action === void 0 ? void 0 : action.outputArtifacts) !== null && _o !== void 0 ? _o : [{
                                name: index == 0 ? codePipelineDefaultValues.pipelineSourceStageOutputArtifact
                                    : codePipelineDefaultValues.pipelineBuildStageOutputArtifact,
                            }] : undefined;
                        console.log(action.configuration, index);
                        console.log(stage_action);
                        return stage_action;
                    }))
                };
            }),
            pipelineType: codePipelineDefaultValues.pipelineType
        },
        // tags: pipelineExecutionVariable.tags.map(tag=>{
        //   return { Key: tag.key, Value: tag.value }
        // })
    };
    const codepipeline = new client_codepipeline_1.CodePipeline();
    return codepipeline.createPipeline(pipelineParams);
});
exports.createPipeline = createPipeline;
