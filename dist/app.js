"use strict";
//  import {createS3BuckerAsStatisSite} from "./resources-aws/s3.resource"
// //  createS3BuckerAsStatisSite({Bucket:"adadada1sds212"}).then(data=>console.log(data)).catch(err=>console.log(err))
Object.defineProperty(exports, "__esModule", { value: true });
const dataType_1 = require("./customDataTypes/dataType");
const codeCommit_resource_1 = require("./resources-aws/codeCommit.resource");
const codeBuild_resource_1 = require("./resources-aws/codeBuild.resource");
const codePipeline_resource_1 = require("./resources-aws/codePipeline.resource");
(0, codeCommit_resource_1.createCodeCommitRepository)("AngularApp_", "./testing", "main", "Initial Commit").then(data => {
    var _a, _b;
    (_a = data === null || data === void 0 ? void 0 : data.repositoryMetadata) === null || _a === void 0 ? void 0 : _a.cloneUrlHttp;
    (0, codeBuild_resource_1.createCodebuild)({
        source: {
            location: (_b = data === null || data === void 0 ? void 0 : data.repositoryMetadata) === null || _b === void 0 ? void 0 : _b.cloneUrlHttp,
        },
        buildType: dataType_1.BUILDTYPE.ECS,
        serviceRole: "arn:aws:iam::590852515231:role/codebuild"
    }).then(data => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        (0, codePipeline_resource_1.createPipeline)({
            pipeline: {
                roleArn: "arn:aws:iam::590852515231:role/service-role/AWSCodePipelineServiceRole-us-east-1-sds",
                buildType: data.buildType,
                stages: [
                    {
                        actions: [{
                                name: "ase",
                                configuration: {
                                    RepositoryName: (_d = (_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.result) === null || _a === void 0 ? void 0 : _a.project) === null || _b === void 0 ? void 0 : _b.source) === null || _c === void 0 ? void 0 : _c.location) === null || _d === void 0 ? void 0 : _d.split("/")[((_g = (_f = (_e = data === null || data === void 0 ? void 0 : data.result.project) === null || _e === void 0 ? void 0 : _e.source) === null || _f === void 0 ? void 0 : _f.location) === null || _g === void 0 ? void 0 : _g.split("/").length) - 1],
                                },
                            }]
                    },
                    {
                        actions: [{
                                name: "assp",
                                configuration: {
                                    ProjectName: (_h = data.result.project) === null || _h === void 0 ? void 0 : _h.name
                                },
                            }]
                    },
                    {
                        actions: [{
                                name: "aspp"
                            }]
                    }
                ]
            }
        });
    });
});
