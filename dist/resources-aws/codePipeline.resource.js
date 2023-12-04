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
const ecs_resource_1 = require("./ecs.resource");
var codePipelineDefaultValues;
(function (codePipelineDefaultValues) {
    codePipelineDefaultValues["pipelineName"] = "ApplicationRollout";
    codePipelineDefaultValues["pipelineArtifactType"] = "S3";
    codePipelineDefaultValues["pipelineArtifactLocation"] = "pipeart12901343";
    codePipelineDefaultValues["pipelineRepoPullStageName"] = "Source";
    codePipelineDefaultValues["pipelineDeployStageName"] = "deploy";
    codePipelineDefaultValues["pipelineBuildStageName"] = "build";
    codePipelineDefaultValues["staticSiteBucketName"] = "angularstat1289034343";
    codePipelineDefaultValues["pipelineStageActionVersion"] = "1";
    codePipelineDefaultValues["pipelineSourceStageOutputArtifact"] = "sourceoutput";
    codePipelineDefaultValues["pipelineBuildStageOutputArtifact"] = "buildoutput";
    codePipelineDefaultValues["pipelineType"] = "V1";
})(codePipelineDefaultValues || (codePipelineDefaultValues = {}));
// async function  getStaticS3BucketName(){
//  return ().Location?.split("//")[1]
// }
const createPipeline = (codePipelineSpec) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    console.log(codePipelineSpec.pipeline.buildType == dataType_1.BUILDTYPE.S3);
    console.log(codePipelineSpec.pipeline.buildType);
    codePipelineSpec.pipeline.buildType == dataType_1.BUILDTYPE.S3 ? yield (0, s3_resource_1.createS3BuckerAsStatisSite)({ Bucket: codePipelineDefaultValues.staticSiteBucketName }) : undefined;
    codePipelineSpec.pipeline.buildType == dataType_1.BUILDTYPE.ECS ? yield (0, ecs_resource_1.createECS)() : undefined;
    yield (0, s3_resource_1.createS3Bucket)({ Bucket: codePipelineDefaultValues.pipelineArtifactLocation });
    const stageLength = codePipelineSpec.pipeline.stages.length;
    const pipelineParams = {
        pipeline: {
            name: (_a = codePipelineSpec.pipeline.name) !== null && _a !== void 0 ? _a : codePipelineDefaultValues.pipelineName,
            roleArn: codePipelineSpec.pipeline.roleArn,
            artifactStore: {
                type: (_d = (_c = (_b = codePipelineSpec === null || codePipelineSpec === void 0 ? void 0 : codePipelineSpec.pipeline) === null || _b === void 0 ? void 0 : _b.artifactStore) === null || _c === void 0 ? void 0 : _c.type) !== null && _d !== void 0 ? _d : codePipelineDefaultValues.pipelineArtifactType,
                location: (_g = (_f = (_e = codePipelineSpec === null || codePipelineSpec === void 0 ? void 0 : codePipelineSpec.pipeline) === null || _e === void 0 ? void 0 : _e.artifactStore) === null || _f === void 0 ? void 0 : _f.location) !== null && _g !== void 0 ? _g : codePipelineDefaultValues.pipelineArtifactLocation,
                //  location: codePipelineSpec?.pipeline?.artifactStore?.location ?? (.Location?.split("//")[1],
            },
            stages: codePipelineSpec.pipeline.stages.map((stage, index) => {
                var _a;
                console.log(index, index == 0 ? codePipelineDefaultValues.pipelineRepoPullStageName
                    : index == stageLength - 1 ? codePipelineDefaultValues.pipelineDeployStageName : codePipelineDefaultValues.pipelineBuildStageName);
                return {
                    name: ((_a = stage.name) !== null && _a !== void 0 ? _a : index == 0) ? codePipelineDefaultValues.pipelineRepoPullStageName
                        : index == stageLength - 1 ? codePipelineDefaultValues.pipelineDeployStageName : codePipelineDefaultValues.pipelineBuildStageName,
                    actions: stage.actions.map((action, ind) => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                        console.log("initial_check--------------");
                        console.log("action.name", action.name);
                        console.log("condition_check", index == 0 ? codePipelineDefaultValues.pipelineRepoPullStageName + "_" + ind
                            : index == stageLength - 1 ? codePipelineDefaultValues.pipelineDeployStageName + "_" + ind : codePipelineDefaultValues.pipelineBuildStageName + "_" + ind);
                        console.log("initial_check---------------");
                        let stage_action = {
                            name: ((_a = action.name) !== null && _a !== void 0 ? _a : index == 0) ? codePipelineDefaultValues.pipelineRepoPullStageName + "_" + ind
                                : index == stageLength - 1 ? codePipelineDefaultValues.pipelineDeployStageName + "_" + ind : codePipelineDefaultValues.pipelineBuildStageName + "_" + ind,
                            //  name:"asasasa"+ind,
                            actionTypeId: {
                                category: ((_c = (_b = action === null || action === void 0 ? void 0 : action.actionTypeId) === null || _b === void 0 ? void 0 : _b.category) !== null && _c !== void 0 ? _c : index == 0) ? codePipelineDataType.actionTypeCategory.Source
                                    : index == stageLength - 1 ? codePipelineDataType.actionTypeCategory.Deploy : codePipelineDataType.actionTypeCategory.Build,
                                owner: (_e = (_d = action === null || action === void 0 ? void 0 : action.actionTypeId) === null || _d === void 0 ? void 0 : _d.owner) !== null && _e !== void 0 ? _e : codePipelineDataType.actionOwner.AWS,
                                provider: ((_g = (_f = action === null || action === void 0 ? void 0 : action.actionTypeId) === null || _f === void 0 ? void 0 : _f.provider) !== null && _g !== void 0 ? _g : index == 0) ? codePipelineDataType.actionProviders.CodeCommit
                                    : index == stageLength - 1 ? codePipelineSpec.pipeline.buildType == dataType_1.BUILDTYPE.S3 ? codePipelineDataType.actionProviders.S3 : codePipelineDataType.actionProviders.ECS : codePipelineDataType.actionProviders.CodeBuild,
                                version: (_j = (_h = action === null || action === void 0 ? void 0 : action.actionTypeId) === null || _h === void 0 ? void 0 : _h.version) !== null && _j !== void 0 ? _j : codePipelineDefaultValues.pipelineStageActionVersion
                            },
                            // 
                            configuration: index == 0 ? Object.assign({ BranchName: "main" }, action.configuration) : index == stageLength - 1 ? codePipelineSpec.pipeline.buildType == dataType_1.BUILDTYPE.S3 ? Object.assign({ 
                                //  BucketName: ,
                                BucketName: codePipelineDefaultValues.staticSiteBucketName, Extract: "true" }, action.configuration) : { ClusterName: "angular", ServiceName: "test" } : Object.assign({}, action.configuration)
                        };
                        index != 0 ? stage_action.inputArtifacts = (_k = action === null || action === void 0 ? void 0 : action.inputArtifacts) !== null && _k !== void 0 ? _k : [{
                                name: index == stageLength - 1 ? codePipelineDefaultValues.pipelineBuildStageOutputArtifact : codePipelineDefaultValues.pipelineSourceStageOutputArtifact,
                            }] : undefined;
                        index != stageLength - 1 ? stage_action.outputArtifacts = (_l = action === null || action === void 0 ? void 0 : action.outputArtifacts) !== null && _l !== void 0 ? _l : [{
                                name: index == 0 ? codePipelineDefaultValues.pipelineSourceStageOutputArtifact
                                    : codePipelineDefaultValues.pipelineBuildStageOutputArtifact,
                            }] : undefined;
                        console.log("check-----------");
                        console.log("action.configuration", action.configuration);
                        console.log("index", index);
                        console.log("stage_action", stage_action);
                        console.log("check-----------");
                        return stage_action;
                    })
                };
            }),
            pipelineType: codePipelineDefaultValues.pipelineType
        },
        // tags: pipelineExecutionVariable.tags.map(tag=>{
        //   return { Key: tag.key, Value: tag.value }
        // })
    };
    console.log("------");
    console.log(pipelineParams);
    console.log(typeof (pipelineParams.pipeline.stages[0]));
    pipelineParams.pipeline.stages.forEach((element) => {
        console.log(element);
    });
    console.log("------");
    const codepipeline = new client_codepipeline_1.CodePipeline();
    return codepipeline.createPipeline(pipelineParams);
});
exports.createPipeline = createPipeline;
