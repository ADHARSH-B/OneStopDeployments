"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggersProviderType = exports.pipelineType = exports.actionOwner = exports.actionProviders = exports.actionTypeCategory = exports.blockerType = exports.encryptionKeyType = exports.pipelineArtifactType = void 0;
var pipelineArtifactType;
(function (pipelineArtifactType) {
    pipelineArtifactType["S3"] = "S3";
})(pipelineArtifactType || (exports.pipelineArtifactType = pipelineArtifactType = {}));
var encryptionKeyType;
(function (encryptionKeyType) {
    encryptionKeyType["KMS"] = "KMS";
})(encryptionKeyType || (exports.encryptionKeyType = encryptionKeyType = {}));
var blockerType;
(function (blockerType) {
    blockerType["Schedule"] = "Schedule";
})(blockerType || (exports.blockerType = blockerType = {}));
var actionTypeCategory;
(function (actionTypeCategory) {
    actionTypeCategory["Source"] = "Source";
    actionTypeCategory["Build"] = "Build";
    actionTypeCategory["Deploy"] = "Deploy";
    actionTypeCategory["Test"] = "Test";
    actionTypeCategory["Invoke"] = "Invoke";
    actionTypeCategory["Approval"] = "Approval";
})(actionTypeCategory || (exports.actionTypeCategory = actionTypeCategory = {}));
var actionProviders;
(function (actionProviders) {
    actionProviders["CodeCommit"] = "CodeCommit";
    actionProviders["CodeBuild"] = "CodeBuild";
    actionProviders["S3"] = "S3";
    actionProviders["ECS"] = "ECS";
})(actionProviders || (exports.actionProviders = actionProviders = {}));
var actionOwner;
(function (actionOwner) {
    actionOwner["AWS"] = "AWS";
    actionOwner["ThirdPart"] = "ThirdParty";
    actionOwner["Custom"] = "Custom";
})(actionOwner || (exports.actionOwner = actionOwner = {}));
var pipelineType;
(function (pipelineType) {
    pipelineType["V1"] = "V1";
    pipelineType["V2"] = "V2";
})(pipelineType || (exports.pipelineType = pipelineType = {}));
var triggersProviderType;
(function (triggersProviderType) {
    triggersProviderType["CodeStarSourceConnection"] = "CodeStarSourceConnection";
})(triggersProviderType || (exports.triggersProviderType = triggersProviderType = {}));
