import {BUILDTYPE} from "../customDataTypes/dataType"
import { CreateBucketCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({});

export const main = async () => {
  const command = new CreateBucketCommand({
    // The name of the bucket. Bucket names are unique and have several other constraints.
    // See https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html
    Bucket: "bucket-name",
  });

  try {
    const { Location } = await client.send(command);
    console.log(`Bucket created with location ${Location}`);
  } catch (err) {
    console.error(err);
  }
}
// JSON data or path to JSON file
const jsonFilePath = './package.json';

import * as shell from "shelljs";


export function getBuildSpecFile(buildType:BUILDTYPE){
    switch (buildType) {
        case BUILDTYPE.ECS:
            return "ecs_deployment_build-spec.yaml"
        case BUILDTYPE.S3:
            return "angular-build-spec.yaml"
        default:
            return "angular-build-spec.yaml"
    }
}

export async function getNodeVersion(){
    const jqCommand = `jq '.engines.node' ${jsonFilePath}`;
    return await new Promise((resolve,reject)=>{
   shell.exec(jqCommand,{cwd:"./testing"},(code:number,stdout:string,stderr:string)=>{
    if(code === 0){
        resolve(stdout);
    }
    else{
        reject(new Error(stderr))
    }
   })
})
}

export async function  createS3(name:string,enableStaticHosting:boolean){
    const client = new S3Client({});
    const command = new CreateBucketCommand({
       
        Bucket: "1212oi32oio2",
      });
    
      try {
        const { Location } = await client.send(command);
        console.log(`Bucket created with location ${Location}`);
      } catch (err) {
        console.error(err);
      }
}

export async function getBuildPath(){
    const jqCommand = `jq '.name' ${jsonFilePath}`;
    return await new Promise((resolve,reject)=>{
   shell.exec(jqCommand,{cwd:"./testing"},(code:number,stdout:string,stderr:string)=>{
    if(code === 0){
        resolve(stdout);
    }
    else{
        reject(new Error(stderr))
    }
   })
})
}

export function getPrivilegedMode(buildType:BUILDTYPE){
    switch (buildType) {
        case BUILDTYPE.ECS:
            return true
        case BUILDTYPE.S3:
            return false
        default:
            return false
    }
}

