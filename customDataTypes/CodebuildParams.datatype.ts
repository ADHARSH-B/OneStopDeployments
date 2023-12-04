import {BUILDTYPE} from "./dataType"
export type codeBuildParams = { 
    name?: string, 
    buildType:BUILDTYPE
    description?: string,
    source: { 
      type?: codeBuildSourceType
      location: string,
      gitCloneDepth?: number,
      gitSubmodulesConfig?: { 
        fetchSubmodules: boolean, 
      },
      buildspec?: string,
      auth?: { 
        type: string, 
        resource: string,
      },
      reportBuildStatus?: boolean,
      buildStatusConfig?: { 
        context: string,
        targetUrl: string,
      },
      insecureSsl?: boolean,
      sourceIdentifier?: string,
    },
    secondarySources?: [ 
      {
        type: codeBuildSourceType,
        location: string,
        gitCloneDepth?: number,
        gitSubmodulesConfig?: {
          fetchSubmodules: boolean, 
        },
        buildspec?: string,
        auth?: {
          type: string, 
          resource: string,
        },
        reportBuildStatus?: boolean,
        buildStatusConfig?: {
          context: string,
          targetUrl: string,
        },
        insecureSsl?: boolean,
        sourceIdentifier?: string,
      },
    ],
    sourceVersion?: string,
    secondarySourceVersions?: [ 
      {
        sourceIdentifier: string, 
        sourceVersion: string, 
      },
    ],
    artifacts?: { 
      type?: codeBuildArtifacts, 
      location: string,
      path?: string,
      namespaceType?: codeBuildArtifactsNamespaceType,
      name?: string,
      packaging?: codeBuildArtifactPackaging,
      overrideArtifactName?: boolean,
      encryptionDisabled ?: boolean,
      artifactIdentifier?: string,
      bucketOwnerAccess?: codeBuildArtifactbucketOwnerAccess,
    },
    secondaryArtifacts?: [ 
        { 
            type: codeBuildArtifacts, 
            location: string,
            path?: string,
            namespaceType?: codeBuildArtifactsNamespaceType,
            name?: string,
            packaging?: codeBuildArtifactPackaging,
            overrideArtifactName: boolean,
            encryptionDisabled ?: boolean,
            artifactIdentifier?: string,
            bucketOwnerAccess?: codeBuildArtifactbucketOwnerAccess,
          },
    ],
    cache?: { 
      type: cacheType, 
      location: string,
      modes: [ 
      cacheModes
      ],
    },
    environment?: { 
      type?: ProjectEnvironmentType,
      image?: string, 
      computeType?: ProjectEnvironmentComputeType 
      environmentVariables?: envVariables[],
      privilegedMode?: boolean,
      certificate?: string,
      registryCredential?: { 
        credential: string, 
        credentialProvider: credentialProvider, 
      },
      imagePullCredentialsType?:imagePullCredentialsType,
    },
    serviceRole: string, 
    timeoutInMinutes?: number,
    queuedTimeoutInMinutes?: number,
    encryptionKey?: number,
    tags?: [ 
      { 
        key: string,
        value: string,
      },
    ],
    vpcConfig?: { 
      vpcId: string,
      subnets: [ 
        string,
      ],
      securityGroupIds: [ 
        string,
      ],
    },
    badgeEnabled?: boolean,
    logsConfig?: { 
      cloudWatchLogs?: { 
        status?: logStatus,
        groupName?: string,
        streamName?: string,
      },
      s3Logs?: {
        status: logStatus, 
        location: string,
        encryptionDisable?: boolean,
        bucketOwnerAccess?: bucketOwnerAccess,
      },
    },
    fileSystemLocations?: [ 
      {
        type: fileSystemLocationsType,
        location: string,
        mountPoint: string,
        identifier: string,
        mountOptions: string,
      },
    ],
    buildBatchConfig?: { 
      serviceRole: string,
      combineArtifacts: boolean,
      restrictions: { 
        maximumBuildsAllowed: number,
        computeTypesAllowed: [ 
          string
        ],
      },
      timeoutInMins: number,
      batchReportMode: batchReportMode,
    },
    concurrentBuildLimit?: number,
  };



export type envVariables={
        name: string, 
        value: string, 
        type: environmentVariablesType,
      
}

export enum codeBuildSourceType {
    CODECOMMIT="CODECOMMIT",
    CODEPIPELINE="CODEPIPELINE",
    GITHUB="GITHUB",
    S3="S3",
    BITBUCKET="BITBUCKET",
    GITHUB_ENTERPRISE="GITHUB_ENTERPRISE",
    NO_SOURCE="NO_SOURCE"
}

export enum codeBuildArtifacts {
    CODEPIPELINE="CODEPIPELINE", 
    S3="S3" ,
    NO_ARTIFACTS= "NO_ARTIFACTS"
}

export enum logStatus {
    ENABLED="ENABLED" ,
    DISABLED= "DISABLED"
}

export enum codeBuildArtifactsNamespaceType{
   NONE="NONE" ,
   BUILD_ID= "BUILD_ID"
}

export enum codeBuildArtifactPackaging {
    NONE= "NONE" ,
    ZIP= "ZIP"
}

export enum batchReportMode{
    REPORT_INDIVIDUAL_BUILDS="REPORT_INDIVIDUAL_BUILDS" ,
    REPORT_AGGREGATED_BATCH="REPORT_AGGREGATED_BATCH"
}
export enum fileSystemLocationsType {
    EFS="EFS"
}

export enum codeBuildArtifactbucketOwnerAccess{
    NONE= "NONE",
    READ_ONLY= "READ_ONLY",
    FULL=  "FULL"
}

export enum cacheType {
    LOCAL = "LOCAL",
    S3 = "S3",
    NO_CACHE="NO_CACHE"
}

export enum imagePullCredentialsType{
    CODEBUILD="CODEBUILD" ,
    SERVICE_ROLE= "SERVICE_ROLE"
}

export enum ProjectEnvironmentType {
    WINDOWS_CONTAINER= "WINDOWS_CONTAINER",
    LINUX_CONTAINER="LINUX_CONTAINER",
    LINUX_GPU_CONTAINER="LINUX_GPU_CONTAINER",
    ARM_CONTAINER="ARM_CONTAINER",
    WINDOWS_SERVER_2019_CONTAINER="WINDOWS_SERVER_2019_CONTAINER",
    LINUX_LAMBDA_CONTAINER="LINUX_LAMBDA_CONTAINER",
    ARM_LAMBDA_CONTAINER="ARM_LAMBDA_CONTAINER"
}

export enum ProjectEnvironmentComputeType{
    BUILD_GENERAL1_SMALL="BUILD_GENERAL1_SMALL",
    BUILD_GENERAL1_MEDIUM="BUILD_GENERAL1_MEDIUM",
    BUILD_GENERAL1_LARGE="BUILD_GENERAL1_LARGE" , 
    BUILD_GENERAL1_2XLARGE="BUILD_GENERAL1_2XLARGE" ,
    BUILD_LAMBDA_1GB="BUILD_LAMBDA_1GB" ,
    BUILD_LAMBDA_2GB= "BUILD_LAMBDA_2GB" ,
    BUILD_LAMBDA_4GB="BUILD_LAMBDA_4GB" ,
    BUILD_LAMBDA_8GB= "BUILD_LAMBDA_8GB",
    BUILD_LAMBDA_10GB=  "BUILD_LAMBDA_10GB",
}

export enum environmentVariablesType {
    PLAINTEXT= "PLAINTEXT" ,
    PARAMETER_STORE="PARAMETER_STORE",
    SECRETS_MANAGER= "SECRETS_MANAGER"
}

export enum bucketOwnerAccess{
    NONE="NONE" ,
    READ_ONLY="READ_ONLY" ,
    FULL= "FULL"
}

export enum cacheModes{
    LOCAL_DOCKER_LAYERS = "LOCAL_DOCKER_LAYERS",
    LOCAL_SOURCE_CODE = "LOCAL_SOURCE_CODE",
    LOCAL_EXTERNAL = "LOCAL_EXTERNAL"
}
export enum credentialProvider{
    SECRETS_MANAGER="SECRETS_MANAGER"
}

