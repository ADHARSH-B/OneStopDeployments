
import {CodePipeline} from "@aws-sdk/client-codepipeline"

import {createS3Bucket,createS3BuckerAsStatisSite} from "./s3.resource"



import * as codePipelineDataType from "../customDataTypes/CodePipelineParams.datatype"
import { BUILDTYPE } from "../customDataTypes/dataType"
import {createECS} from "./ecs.resource"

enum codePipelineDefaultValues {
  pipelineName="ApplicationRollout",
  pipelineArtifactType=codePipelineDataType.pipelineArtifactType.S3,
  pipelineArtifactLocation="pipeart12901343",
  pipelineRepoPullStageName="Source",
  pipelineDeployStageName="deploy",
  pipelineBuildStageName="build",
  staticSiteBucketName="angularstat1289034343",
  pipelineStageActionVersion="1",
  pipelineSourceStageOutputArtifact="sourceoutput",
  pipelineBuildStageOutputArtifact="buildoutput",
  pipelineType=codePipelineDataType.pipelineType.V1
}

// async function  getStaticS3BucketName(){
//  return ().Location?.split("//")[1]
// }

export const createPipeline = async(codePipelineSpec:codePipelineDataType.codePipelineParams)=>{
  console.log( codePipelineSpec.pipeline.buildType==BUILDTYPE.S3 )
  console.log(codePipelineSpec.pipeline.buildType)
  codePipelineSpec.pipeline.buildType==BUILDTYPE.S3 ? await createS3BuckerAsStatisSite({Bucket:codePipelineDefaultValues.staticSiteBucketName}):undefined
  codePipelineSpec.pipeline.buildType==BUILDTYPE.ECS ? await createECS():undefined
  await createS3Bucket({Bucket:codePipelineDefaultValues.pipelineArtifactLocation})

    const stageLength=codePipelineSpec.pipeline.stages.length
    const pipelineParams:any = { 
        pipeline: { 
          name: codePipelineSpec.pipeline.name ?? codePipelineDefaultValues.pipelineName,
          roleArn: codePipelineSpec.pipeline.roleArn , 
          artifactStore: {
            type:codePipelineSpec?.pipeline?.artifactStore?.type ?? codePipelineDefaultValues.pipelineArtifactType  ,
              location:codePipelineSpec?.pipeline?.artifactStore?.location ?? codePipelineDefaultValues.pipelineArtifactLocation,
              //  location: codePipelineSpec?.pipeline?.artifactStore?.location ?? (.Location?.split("//")[1],
          },
          
          
          stages:codePipelineSpec.pipeline.stages.map((stage,index)=>{
            console.log(index,index==0 ? codePipelineDefaultValues.pipelineRepoPullStageName
              :index==stageLength-1?codePipelineDefaultValues.pipelineDeployStageName :codePipelineDefaultValues.pipelineBuildStageName,
)
            return {
              name:stage.name ?? index==0 ? codePipelineDefaultValues.pipelineRepoPullStageName
              :index==stageLength-1?codePipelineDefaultValues.pipelineDeployStageName :codePipelineDefaultValues.pipelineBuildStageName,

            actions:stage.actions.map(  (action,ind)=>{
              console.log("initial_check--------------")
              console.log("action.name",action.name)
              console.log("condition_check",index==0 ? codePipelineDefaultValues.pipelineRepoPullStageName + "_"+ ind
              :index==stageLength-1? codePipelineDefaultValues.pipelineDeployStageName +"_"+ind :codePipelineDefaultValues.pipelineBuildStageName + "_" +ind ,
)
              console.log("initial_check---------------")
              let stage_action:any= {
                 name:action.name ?? index==0 ? codePipelineDefaultValues.pipelineRepoPullStageName + "_"+ ind
                 :index==stageLength-1? codePipelineDefaultValues.pipelineDeployStageName +"_"+ind :codePipelineDefaultValues.pipelineBuildStageName + "_" +ind ,
              //  name:"asasasa"+ind,
            
                actionTypeId:{
                  category:action?.actionTypeId?.category ?? index==0 ? codePipelineDataType.actionTypeCategory.Source
                  :index==stageLength-1 ? codePipelineDataType.actionTypeCategory.Deploy: codePipelineDataType.actionTypeCategory.Build,
                  
                  owner:action?.actionTypeId?.owner ?? codePipelineDataType.actionOwner.AWS,

                  provider:action?.actionTypeId?.provider ?? index==0 ? codePipelineDataType.actionProviders.CodeCommit
                  :index==stageLength-1 ?  codePipelineSpec.pipeline.buildType==BUILDTYPE.S3 ? codePipelineDataType.actionProviders.S3:codePipelineDataType.actionProviders.ECS : codePipelineDataType.actionProviders.CodeBuild,
                  version:action?.actionTypeId?.version ?? codePipelineDefaultValues.pipelineStageActionVersion
                }, 
                // 
                configuration: index==0 ? {BranchName: "main",...action.configuration}
                :index==stageLength-1 ? codePipelineSpec.pipeline.buildType==BUILDTYPE.S3 ? {
                  //  BucketName: ,
                    BucketName:codePipelineDefaultValues.staticSiteBucketName,
                   Extract: "true",
                   ... action.configuration
              } :{ClusterName:"angular",ServiceName:"test"} : {...action.configuration}
              }
          
              index!=0 ? stage_action.inputArtifacts=  action?.inputArtifacts ?? [{
                name: index==stageLength-1 ? codePipelineDefaultValues.pipelineBuildStageOutputArtifact: codePipelineDefaultValues.pipelineSourceStageOutputArtifact,
                
              }]:undefined
              index!=stageLength-1 ?  stage_action.outputArtifacts=action?.outputArtifacts ??[{
                name: index==0 ? codePipelineDefaultValues.pipelineSourceStageOutputArtifact
              : codePipelineDefaultValues.pipelineBuildStageOutputArtifact,
                
              }] : undefined
              console.log("check-----------")
               console.log("action.configuration",action.configuration)
               console.log("index",index)
               console.log("stage_action",stage_action)
               console.log("check-----------")
              return stage_action
            })
            }
            
          }) ,
         
          pipelineType:codePipelineDefaultValues.pipelineType
        },
        // tags: pipelineExecutionVariable.tags.map(tag=>{
        //   return { Key: tag.key, Value: tag.value }
        // })

      }
      console.log("------")
      console.log(pipelineParams)
      console.log(typeof(pipelineParams.pipeline.stages[0]))
    pipelineParams.pipeline.stages.forEach((element: any) => {
      console.log(element)
    });
      console.log("------")
      const codepipeline = new CodePipeline();
      return codepipeline.createPipeline(pipelineParams)
}
 