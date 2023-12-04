
import { CodeCommit } from "@aws-sdk/client-codecommit";

import * as shell from "shelljs";



export const createCodeCommitRepository = async (repositoryName:string,folderPath:string,branchName:String,commitMessage:string)=>{
    const codecommit = new CodeCommit();
    try{
        const createdRepository = await codecommit.createRepository({repositoryName})
        console.log(
            `CodeCommit repository '${repositoryName}' created successfully.`
          );

          await new Promise((resolve,reject)=>{
            shell.exec(`git init`, { cwd: folderPath },(code:number,stdout:string,stderr:string)=>{
                if(code === 0){
                    resolve("Git initialized");
                }
                else{
                    reject(new Error("Git Initialization failed"))
                }
            });
          })
          await new Promise((resolve,reject)=>{
            shell.exec(`git add .`, { cwd: folderPath },(code:number,stdout:string,stderr:string)=>{
                if(code === 0){
                    resolve("Git Add Success");
                }
                else{
                    reject(new Error("Git Add failed"))
                }
            });
          })


          await new Promise((resolve,reject)=>{
            shell.exec(`git commit -m "${commitMessage}"`, { cwd: folderPath },(code:number,stdout:string,stderr:string)=>{
                if(code === 0){
                    resolve("Git Commit Success");
                }
                else{
                    console.log(code)
                    reject(new Error("Repo is UptoDate, No changes are made"))
                }
            });
          })
          

          await new Promise((resolve,reject)=>{
         
            shell.exec(
                `git remote add origin ${createdRepository?.repositoryMetadata?.cloneUrlHttp}`, { cwd: folderPath },(code:number,stdout:string,stderr:string)=>{
                if(code === 0){
                    resolve("Git Remote Add Origin Success");
                }
                else{
                    reject(new Error("Git Remote Add Origin failed"))
                }
            });
          })
       
        
          await new Promise((resolve,reject)=>{
            shell.exec(`git push origin ${branchName}`, { cwd: folderPath },(code:number,stdout:string,stderr:string)=>{
                if(code === 0){
                    resolve("git push origin Success");
                }
                else{
                    reject(new Error("git push origin failed"))
                }
            });
          })
     
          console.log("Code pushed to CodeCommit repository.");
          return createdRepository
         
    }
    catch(err){
        console.log(err)
        console.log("error occured!")
    }
}
