
import { CodeBuild } from "@aws-sdk/client-codebuild"; 
import {getBuildSpecFile,getPrivilegedMode} from "../utils/codeDeployConfigType"
import { BUILDTYPE } from "../customDataTypes/dataType";
import fs from 'fs';
import yaml from 'js-yaml';
import {getBuildPath, getNodeVersion} from "../utils/codeDeployConfigType"

import {createS3Bucket} from "./s3.resource"

import path from 'path';


import * as codeBuildDataType from "../customDataTypes/CodebuildParams.datatype"


const buildSpecFilePath:string = "../../build-spec-files"

// these details needed to be stored in db

enum codeBuildDefaultValues {
  projectName="AppBuild",
  description="This project will build the application code and produce the desired build Artifacts",
  projectSourceType=codeBuildDataType.codeBuildSourceType.CODECOMMIT,
  artifactsType=codeBuildDataType.codeBuildArtifacts.S3,
  codeBuildArtifactsLocation="codebuildartifact13923433",
  // artifactsLocations="",
  ProjectEnvironmentType=codeBuildDataType.ProjectEnvironmentType.LINUX_CONTAINER,
  ProjectEnvironmentImage="aws/codebuild/standard:5.0",
  ProjectEnvironmentComputeType=codeBuildDataType.ProjectEnvironmentComputeType.BUILD_GENERAL1_SMALL,
  cloudWatchLogsStatus=codeBuildDataType.logStatus.ENABLED
}



export const createCodebuild = async(codeBuildProjectSpec:codeBuildDataType.codeBuildParams)=>{
    const codebuild=new CodeBuild()
    const yamlData = fs.readFileSync(path.join(__dirname,buildSpecFilePath,getBuildSpecFile(codeBuildProjectSpec.buildType)), 'utf8');
    await createS3Bucket({Bucket:codeBuildDefaultValues.codeBuildArtifactsLocation})
    const codeBuildParams:any = { 
        name: codeBuildProjectSpec.name ?? codeBuildDefaultValues.projectName, 
        description: codeBuildProjectSpec.description ?? codeBuildDefaultValues.description ,
        source: { 
          type: codeBuildProjectSpec.source.type ?? codeBuildDefaultValues.projectSourceType ,
          location: codeBuildProjectSpec.source.location,
          buildspec:  codeBuildProjectSpec.buildType == BUILDTYPE.ECS ? yaml.dump(yamlData).replace(/\|-/, ''): yaml.dump(yamlData).replace(/\|/, '')
        },
        artifacts: { 
          type: codeBuildProjectSpec?.artifacts?.type ?? codeBuildDefaultValues.artifactsType, 
          location:  codeBuildProjectSpec?.artifacts?.location ?? codeBuildDefaultValues.codeBuildArtifactsLocation
          //  location: codeBuildProjectSpec?.artifacts?.location ?? (await createS3Bucket({Bucket:codeBuildDefaultValues.codeBuildArtifactsLocation})).Location?.split("/")[1],
        },
        environment: { 
          type: codeBuildProjectSpec?.environment?.type ?? codeBuildDefaultValues.ProjectEnvironmentType,
          image: codeBuildProjectSpec?.environment?.image ?? codeBuildDefaultValues.ProjectEnvironmentImage,
          computeType: codeBuildProjectSpec?.environment?.computeType ?? codeBuildDefaultValues.ProjectEnvironmentComputeType ,
          
          privilegedMode:getPrivilegedMode(codeBuildProjectSpec.buildType),
          environmentVariables: [{ 
            name: "BUILD_FOLDER", 
            value: await getBuildPath() , 
     
            type: codeBuildDataType.environmentVariablesType.PLAINTEXT 
          },{
            name:"NODEJS_VERSION",
       
            value: await getNodeVersion(),
            type:codeBuildDataType.environmentVariablesType.PLAINTEXT
          }],
        },
        serviceRole: codeBuildProjectSpec.serviceRole, 
        logsConfig: { 
          cloudWatchLogs: { 
            status: codeBuildProjectSpec.logsConfig?.cloudWatchLogs?.status ?? codeBuildDefaultValues.cloudWatchLogsStatus
          }
        }
      };
      const result=await codebuild.createProject(codeBuildParams)
      return {result,buildType:codeBuildProjectSpec.buildType}
  }
  