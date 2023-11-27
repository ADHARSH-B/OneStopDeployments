
export enum s3ACL {
    private="private",
    publicread="public-read",
    publicreadwrite="public-read-write",
    authenticatedread="authenticated-read"
}

export enum LocationConstraint {
    afsouth1="af-south-1",
    apeast1="ap-east-1",
    apnortheast1="ap-northeast-1",
    apnortheast2="ap-northeast-2",
    apnortheast3="ap-northeast-3",
    apsouth1="ap-south-1",
    apsoutheast1="ap-southeast-1",
    apsoutheast2="ap-southeast-2",
    apsoutheast3 ="ap-southeast-3",
    cacentral1= "ca-central-1",
    cnnorth1= "cn-north-1",
    cnnorthwest1 =    "cn-northwest-1" ,
    EU="EU",
    eucentral1=  "eu-central-1" ,
    eunorth1 = "eu-north-1" ,
    eusouth1= "eu-south-1",
    euwest1="eu-west-1" ,
    euwest2 ="eu-west-2",
    euwest3="eu-west-3",
    mesouth1="me-south-1",
    saeast1="sa-east-1",
    useast2="us-east-2",
    usgoveast1="us-gov-east-1",
    uswest1="us-west-1",
    uswest2= "us-west-2",
    apsouth2="ap-south-2",
    eusouth2="eu-south-2",
    
}

enum ObjectOwnership{
    BucketOwnerPreferred="BucketOwnerPreferred",
    ObjectWriter="ObjectWriter",
    BucketOwnerEnforced="BucketOwnerEnforced"
}


export type createS3 = { // CreateBucketRequest
  ACL?: s3ACL,
  Bucket: string, // required
  CreateBucketConfiguration?: { // CreateBucketConfiguration
    LocationConstraint:LocationConstraint
  },
  GrantFullControl?: string,
  GrantRead?: string,
  GrantReadACP?: string,
  GrantWrite?: string,
  GrantWriteACP?: string,
 ObjectLockEnabledForBucket?: boolean,
  ObjectOwnership?: ObjectOwnership,
};

enum ChecksumAlgorithm{
    CRC32="CRC32",
    CRC32C="CRC32C",
    SHA1="SHA1",
    SHA256="SHA256"
}
enum Protocol{
    http="http",
    https="https"
}

export type  PutBucketWebsite = { // PutBucketWebsiteRequest
    Bucket: string, 
    ContentMD5?: string,
    ChecksumAlgorithm?: ChecksumAlgorithm,
    WebsiteConfiguration?: { 
      ErrorDocument: { 
        Key: string, 
      },
      IndexDocument: { 
        Suffix: string 
      },
      RedirectAllRequestsTo?: { 
        HostName: string, 
        Protocol: Protocol,
      },
      RoutingRules?: [
        { 
          Condition: { 
            HttpErrorCodeReturnedEquals: string,
            KeyPrefixEquals: string,
          },
          Redirect: { 
            HostName: string,
            HttpRedirectCode: string,
            Protocol: Protocol,
            ReplaceKeyPrefixWith: string,
            ReplaceKeyWith: string,
          },
        },
      ],
    },
    ExpectedBucketOwner?: "STRING_VALUE",
  }

export type PutPublicAccessBlockCommand={
    Bucket: string, // required
  ContentMD5: string,
  ChecksumAlgorithm: ChecksumAlgorithm,
  PublicAccessBlockConfiguration: { // PublicAccessBlockConfiguration
    BlockPublicAcls: boolean
    IgnorePublicAcls: boolean,
    BlockPublicPolicy: boolean,
    RestrictPublicBuckets: boolean,
  },
  ExpectedBucketOwner? : string,
}

export type PutBucketPolicyCommand={
    Bucket: string, // required
  ContentMD5?: "",
  ChecksumAlgorithm?: ChecksumAlgorithm,
  ConfirmRemoveSelfBucketAccess?: boolean,
  Policy: string, // required
  ExpectedBucketOwner?: string,
}