
import {CodePipeline} from "@aws-sdk/client-codepipeline"

import {createS3Bucket,createS3BuckerAsStatisSite} from "./s3.resource"



import * as codePipelineDataType from "../customDataTypes/CodePipelineParams.datatype"
import { BUILDTYPE } from "../customDataTypes/dataType"

enum codePipelineDefaultValues {
  pipelineName="ApplicationRollout",
  pipelineArtifactType=codePipelineDataType.pipelineArtifactType.S3,
  pipelineArtifactLocation="pipelineartifactbucketsdsds",
  pipelineRepoPullStageName="Source",
  pipelineDeployStageName="deploy",
  pipelineBuildStageName="build",
  pipelineStageActionVersion="1",
  pipelineSourceStageOutputArtifact="sourceoutput",
  pipelineBuildStageOutputArtifact="buildoutput",
  pipelineType=codePipelineDataType.pipelineType.V1
}

export const createPipeline = async(codePipelineSpec:codePipelineDataType.codePipelineParams)=>{
    const stageLength=codePipelineSpec.pipeline.stages.length
    const pipelineParams:any = { 
        pipeline: { 
          name: codePipelineSpec.pipeline.name ?? codePipelineDefaultValues.pipelineName,
          roleArn: codePipelineSpec.pipeline.roleArn , 
          artifactStore: {
            type:codePipelineSpec?.pipeline?.artifactStore?.type ?? codePipelineDefaultValues.pipelineArtifactType  ,
            location: codePipelineSpec?.pipeline?.artifactStore?.location ?? (await createS3Bucket({Bucket:"sdsd2121212"})).Location?.split("//")[1].split(".")[0],
          },
          
          
          stages:codePipelineSpec.pipeline.stages.map((stage,index)=>{
            console.log(index,index==0 ? codePipelineDefaultValues.pipelineRepoPullStageName
              :index==stageLength-1?codePipelineDefaultValues.pipelineDeployStageName :codePipelineDefaultValues.pipelineBuildStageName,
)
            return {
              name:stage.name ?? index==0 ? codePipelineDefaultValues.pipelineRepoPullStageName
              :index==stageLength-1?codePipelineDefaultValues.pipelineDeployStageName :codePipelineDefaultValues.pipelineBuildStageName,

            actions:stage.actions.map(async (action,ind)=>{
               
              let stage_action:any={
                name:action.name ?? index==0 ? codePipelineDefaultValues.pipelineRepoPullStageName + "_"+ ind
                :index==stageLength-1? codePipelineDefaultValues.pipelineDeployStageName +"_"+ind :codePipelineDefaultValues.pipelineBuildStageName + "_" +ind ,
  
            
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
                :index==stageLength-1 ? {
                  BucketName: (await createS3BuckerAsStatisSite({Bucket:"angularappbucketas1212u923"})).Location?.split("//")[1].split(".")[0],
                   Extract: "true",
                   ... action.configuration
              } : {...action.configuration}
              }
          
              index!=0 ? stage_action.inputArtifacts=  action?.inputArtifacts ?? [{
                name: index==stageLength ? codePipelineDefaultValues.pipelineBuildStageOutputArtifact: codePipelineDefaultValues.pipelineSourceStageOutputArtifact,
                
              }]:undefined
              index!=stageLength-1 ?  stage_action.outputArtifacts=action?.outputArtifacts ??[{
                name: index==0 ? codePipelineDefaultValues.pipelineSourceStageOutputArtifact
              : codePipelineDefaultValues.pipelineBuildStageOutputArtifact,
                
              }] : undefined
               console.log(action.configuration,index)
               console.log(stage_action)
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
      const codepipeline = new CodePipeline();
      return codepipeline.createPipeline(pipelineParams)
}
 