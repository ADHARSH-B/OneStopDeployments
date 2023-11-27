import { BUILDTYPE } from "./dataType"

export enum pipelineArtifactType {
    S3="S3"
}

export enum encryptionKeyType{
    KMS="KMS"
}

export enum blockerType{
    Schedule="Schedule"
}

export enum actionTypeCategory{
    Source="Source",
    Build= "Build" ,
    Deploy="Deploy",
    Test= "Test" ,
    Invoke= "Invoke" ,
    Approval= "Approval",
}

export enum actionProviders{
  CodeCommit="CodeCommit",
  CodeBuild="CodeBuild",
  S3="S3",
  ECS="ECS"
}


export enum actionOwner {
    AWS="AWS" ,
    ThirdPart="ThirdParty" ,
    Custom="Custom"
}



export enum pipelineType{
    V1="V1",
    V2="V2"
}

export type S3Configuration={
  BucketName:string,
  Extract:string
}

export type codeBuildConfiguration= {
  ProjectName:string
}

export type sourceConfiguration= {
  RepositoryName:string,
  BranchName?:string
}

type pipelineAction={ 
  name?: string, 

  actionTypeId?: { 
    category: actionTypeCategory ,
    owner: actionOwner, 
    provider: actionProviders, 
    version: string, 
  },
  runOrder?: number,
  configuration?: S3Configuration| ECSConfiguration | sourceConfiguration |codeBuildConfiguration,
  outputArtifacts?: [ 
    { 
      name?: string, 
    },
  ],
  inputArtifacts?: [ 
    { 
      name?: string, 
    },
  ],
  // roleArn: string,
  region?: string,
  namespace?: string,
}

type pipelineStage=
  { 
    name?: string, 
    blockers?: [ 
      { 
        name: string, 
        type: blockerType,
      },
    ],
    actions: pipelineAction[]
      

  }




export type ECSConfiguration={
  ClusterName: string,
  ServiceName: string
}


export enum triggersProviderType {
    CodeStarSourceConnection="CodeStarSourceConnection"
}

export type codePipelineParams = { 
    pipeline: { 
      
      name?: string, 
      buildType:BUILDTYPE

      roleArn: string, 
      artifactStore?: { 
        type: pipelineArtifactType, 
        location: string, 
        encryptionKey?: { 
          id: string, 
          type: encryptionKeyType, 
        },
      },
      artifactStores?: { 
        [key:string]: {
          type: pipelineArtifactType,
          location: string,
          encryptionKey?: {
            id: string, 
            type: encryptionKeyType,
          },
        },
      },
      stages: pipelineStage[],
      
      version?: number
      pipelineType?:pipelineType ,
      triggers?: [ 
        { 
          providerType: triggersProviderType, 
          gitConfiguration: { 
            sourceActionName: string, 
            push: [ 
              { 
                tags: { 
                  includes: [ 
                    string,
                  ],
                  excludes: [
                    string,
                  ],
                },
              },
            ],
          },
        },
      ],
      variables?: [ 
        { 
          name: string, 
          defaultValue: string,
          description: string,
        },
      ],
    },
    tags?: [ 
      { 
        key: string, 
        value: string, 
      },
    ],
  };
























