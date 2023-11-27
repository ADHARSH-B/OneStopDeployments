import {createS3BuckerAsStatisSite} from "./resources-aws/s3.resource"
createS3BuckerAsStatisSite({Bucket:"adadada1212"})
// import { BUILDTYPE } from "./customDataTypes/dataType";
// import {createCodeCommitRepository} from "./resources-aws/codeCommit.resource"
// import {createCodebuild} from "./resources-aws/codeBuild.resource"
// import {createPipeline} from "./resources-aws/codePipeline.resource"

// createCodeCommitRepository("AngularApp","./testing","main","Initial Commit").then(data=>{
//     data?.repositoryMetadata?.cloneUrlHttp
//     createCodebuild({
//         source: { 
//           location:data?.repositoryMetadata?.cloneUrlHttp as string,
//         },
//         buildType: BUILDTYPE.S3,
//         serviceRole:"arn:aws:iam::590852515231:role/codebuild"
//       }).then(data=>{
//         createPipeline({
//             pipeline:{
//                 roleArn: "arn:aws:iam::590852515231:role/service-role/AWSCodePipelineServiceRole-us-east-1-sds",
//                 buildType:data.buildType,
//                 stages: [
//                     {   
//                         actions: [{
//                             configuration: {
//                                 RepositoryName: data?.result?.project?.source?.location?.split("/")[data?.result.project?.source?.location?.split("/").length-1] as string,
//                             },
//                         }]
//                     },
//                     {
//                         actions: [{
//                             configuration: {
//                                 ProjectName: data.result.project?.name as string
//                             },     
//                         }]
//                     },
//                     {
//                         actions: [{ 
//                         }]
//                     }
//                 ]
             
//             }
//         })
//       })
// })








