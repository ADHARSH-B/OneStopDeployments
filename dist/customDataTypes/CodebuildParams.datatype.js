"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentialProvider = exports.cacheModes = exports.bucketOwnerAccess = exports.environmentVariablesType = exports.ProjectEnvironmentComputeType = exports.ProjectEnvironmentType = exports.imagePullCredentialsType = exports.cacheType = exports.codeBuildArtifactbucketOwnerAccess = exports.fileSystemLocationsType = exports.batchReportMode = exports.codeBuildArtifactPackaging = exports.codeBuildArtifactsNamespaceType = exports.logStatus = exports.codeBuildArtifacts = exports.codeBuildSourceType = void 0;
var codeBuildSourceType;
(function (codeBuildSourceType) {
    codeBuildSourceType["CODECOMMIT"] = "CODECOMMIT";
    codeBuildSourceType["CODEPIPELINE"] = "CODEPIPELINE";
    codeBuildSourceType["GITHUB"] = "GITHUB";
    codeBuildSourceType["S3"] = "S3";
    codeBuildSourceType["BITBUCKET"] = "BITBUCKET";
    codeBuildSourceType["GITHUB_ENTERPRISE"] = "GITHUB_ENTERPRISE";
    codeBuildSourceType["NO_SOURCE"] = "NO_SOURCE";
})(codeBuildSourceType || (exports.codeBuildSourceType = codeBuildSourceType = {}));
var codeBuildArtifacts;
(function (codeBuildArtifacts) {
    codeBuildArtifacts["CODEPIPELINE"] = "CODEPIPELINE";
    codeBuildArtifacts["S3"] = "S3";
    codeBuildArtifacts["NO_ARTIFACTS"] = "NO_ARTIFACTS";
})(codeBuildArtifacts || (exports.codeBuildArtifacts = codeBuildArtifacts = {}));
var logStatus;
(function (logStatus) {
    logStatus["ENABLED"] = "ENABLED";
    logStatus["DISABLED"] = "DISABLED";
})(logStatus || (exports.logStatus = logStatus = {}));
var codeBuildArtifactsNamespaceType;
(function (codeBuildArtifactsNamespaceType) {
    codeBuildArtifactsNamespaceType["NONE"] = "NONE";
    codeBuildArtifactsNamespaceType["BUILD_ID"] = "BUILD_ID";
})(codeBuildArtifactsNamespaceType || (exports.codeBuildArtifactsNamespaceType = codeBuildArtifactsNamespaceType = {}));
var codeBuildArtifactPackaging;
(function (codeBuildArtifactPackaging) {
    codeBuildArtifactPackaging["NONE"] = "NONE";
    codeBuildArtifactPackaging["ZIP"] = "ZIP";
})(codeBuildArtifactPackaging || (exports.codeBuildArtifactPackaging = codeBuildArtifactPackaging = {}));
var batchReportMode;
(function (batchReportMode) {
    batchReportMode["REPORT_INDIVIDUAL_BUILDS"] = "REPORT_INDIVIDUAL_BUILDS";
    batchReportMode["REPORT_AGGREGATED_BATCH"] = "REPORT_AGGREGATED_BATCH";
})(batchReportMode || (exports.batchReportMode = batchReportMode = {}));
var fileSystemLocationsType;
(function (fileSystemLocationsType) {
    fileSystemLocationsType["EFS"] = "EFS";
})(fileSystemLocationsType || (exports.fileSystemLocationsType = fileSystemLocationsType = {}));
var codeBuildArtifactbucketOwnerAccess;
(function (codeBuildArtifactbucketOwnerAccess) {
    codeBuildArtifactbucketOwnerAccess["NONE"] = "NONE";
    codeBuildArtifactbucketOwnerAccess["READ_ONLY"] = "READ_ONLY";
    codeBuildArtifactbucketOwnerAccess["FULL"] = "FULL";
})(codeBuildArtifactbucketOwnerAccess || (exports.codeBuildArtifactbucketOwnerAccess = codeBuildArtifactbucketOwnerAccess = {}));
var cacheType;
(function (cacheType) {
    cacheType["LOCAL"] = "LOCAL";
    cacheType["S3"] = "S3";
    cacheType["NO_CACHE"] = "NO_CACHE";
})(cacheType || (exports.cacheType = cacheType = {}));
var imagePullCredentialsType;
(function (imagePullCredentialsType) {
    imagePullCredentialsType["CODEBUILD"] = "CODEBUILD";
    imagePullCredentialsType["SERVICE_ROLE"] = "SERVICE_ROLE";
})(imagePullCredentialsType || (exports.imagePullCredentialsType = imagePullCredentialsType = {}));
var ProjectEnvironmentType;
(function (ProjectEnvironmentType) {
    ProjectEnvironmentType["WINDOWS_CONTAINER"] = "WINDOWS_CONTAINER";
    ProjectEnvironmentType["LINUX_CONTAINER"] = "LINUX_CONTAINER";
    ProjectEnvironmentType["LINUX_GPU_CONTAINER"] = "LINUX_GPU_CONTAINER";
    ProjectEnvironmentType["ARM_CONTAINER"] = "ARM_CONTAINER";
    ProjectEnvironmentType["WINDOWS_SERVER_2019_CONTAINER"] = "WINDOWS_SERVER_2019_CONTAINER";
    ProjectEnvironmentType["LINUX_LAMBDA_CONTAINER"] = "LINUX_LAMBDA_CONTAINER";
    ProjectEnvironmentType["ARM_LAMBDA_CONTAINER"] = "ARM_LAMBDA_CONTAINER";
})(ProjectEnvironmentType || (exports.ProjectEnvironmentType = ProjectEnvironmentType = {}));
var ProjectEnvironmentComputeType;
(function (ProjectEnvironmentComputeType) {
    ProjectEnvironmentComputeType["BUILD_GENERAL1_SMALL"] = "BUILD_GENERAL1_SMALL";
    ProjectEnvironmentComputeType["BUILD_GENERAL1_MEDIUM"] = "BUILD_GENERAL1_MEDIUM";
    ProjectEnvironmentComputeType["BUILD_GENERAL1_LARGE"] = "BUILD_GENERAL1_LARGE";
    ProjectEnvironmentComputeType["BUILD_GENERAL1_2XLARGE"] = "BUILD_GENERAL1_2XLARGE";
    ProjectEnvironmentComputeType["BUILD_LAMBDA_1GB"] = "BUILD_LAMBDA_1GB";
    ProjectEnvironmentComputeType["BUILD_LAMBDA_2GB"] = "BUILD_LAMBDA_2GB";
    ProjectEnvironmentComputeType["BUILD_LAMBDA_4GB"] = "BUILD_LAMBDA_4GB";
    ProjectEnvironmentComputeType["BUILD_LAMBDA_8GB"] = "BUILD_LAMBDA_8GB";
    ProjectEnvironmentComputeType["BUILD_LAMBDA_10GB"] = "BUILD_LAMBDA_10GB";
})(ProjectEnvironmentComputeType || (exports.ProjectEnvironmentComputeType = ProjectEnvironmentComputeType = {}));
var environmentVariablesType;
(function (environmentVariablesType) {
    environmentVariablesType["PLAINTEXT"] = "PLAINTEXT";
    environmentVariablesType["PARAMETER_STORE"] = "PARAMETER_STORE";
    environmentVariablesType["SECRETS_MANAGER"] = "SECRETS_MANAGER";
})(environmentVariablesType || (exports.environmentVariablesType = environmentVariablesType = {}));
var bucketOwnerAccess;
(function (bucketOwnerAccess) {
    bucketOwnerAccess["NONE"] = "NONE";
    bucketOwnerAccess["READ_ONLY"] = "READ_ONLY";
    bucketOwnerAccess["FULL"] = "FULL";
})(bucketOwnerAccess || (exports.bucketOwnerAccess = bucketOwnerAccess = {}));
var cacheModes;
(function (cacheModes) {
    cacheModes["LOCAL_DOCKER_LAYERS"] = "LOCAL_DOCKER_LAYERS";
    cacheModes["LOCAL_SOURCE_CODE"] = "LOCAL_SOURCE_CODE";
    cacheModes["LOCAL_EXTERNAL"] = "LOCAL_EXTERNAL";
})(cacheModes || (exports.cacheModes = cacheModes = {}));
var credentialProvider;
(function (credentialProvider) {
    credentialProvider["SECRETS_MANAGER"] = "SECRETS_MANAGER";
})(credentialProvider || (exports.credentialProvider = credentialProvider = {}));
