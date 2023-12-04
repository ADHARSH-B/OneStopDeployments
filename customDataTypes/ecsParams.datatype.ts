// export type tags={
//     key:string,
//     value:string
// }

// export type settings ={
//     name: string,
//     value:string
// }

// export enum logging {
//     NONE="NONE",
//     DEFAULT="DEFAULT",
//     OVERRIDE="OVERRIDE"
// }

// export type defaultCapacityProviderStrategy={
//     capacityProvider: string, // required
//     weight: number,
//     base: number,
// }
// export type createECSCluster = { 
//     clusterName: string,
//     tags?:tags[],
//     settings?: settings[],
//     configuration?: { 
//       executeCommandConfiguration: { 
//         kmsKeyId: string,
//         logging: logging
//         logConfiguration: { 
//           cloudWatchLogGroupName: string,
//           cloudWatchEncryptionEnabled: boolean
//           s3BucketName: string,
//           s3EncryptionEnabled: boolean,
//           s3KeyPrefix: string,
//         },
//       },
//     },
//     capacityProviders?:  string[],
//     defaultCapacityProviderStrategy?: defaultCapacityProviderStrategy[],
//     serviceConnectDefaults?: { // ClusterServiceConnectDefaultsRequest
//       namespace: string, 
//     },
//   };