import {createS3,PutBucketWebsite,} from "../customDataTypes/S3Params.datatype"
import {LocationConstraint} from "../customDataTypes/S3Params.datatype"
import { S3Client, CreateBucketCommand ,PutBucketWebsiteCommand,PutPublicAccessBlockCommand,PutBucketPolicyCommand} from "@aws-sdk/client-s3";
const client = new S3Client({region:"us-east-2"});

export const createS3Bucket = async (createS3Params:createS3)=>{
    
    return await client.send(new CreateBucketCommand({
        Bucket: createS3Params.Bucket,
        CreateBucketConfiguration: { // CreateBucketConfiguration
            LocationConstraint:LocationConstraint.useast2
          }
    }));
  
};

export const createS3BuckerAsStatisSite = async(staticSite:PutBucketWebsite)=>{

    const bucketPolicy = {
        Version: '2012-10-17',
        Statement: [
          {
            Sid: 'PublicReadGetObject',
            Effect: 'Allow',
            Principal: '*',
            Action: 's3:GetObject',
            Resource: [`arn:aws:s3:::${staticSite.Bucket}/*`,`arn:aws:s3:::${staticSite.Bucket}`]
          }
        ]
      };
    const s3Details=await client.send(new CreateBucketCommand({
        Bucket: staticSite.Bucket,
        CreateBucketConfiguration: { // CreateBucketConfiguration
            LocationConstraint:LocationConstraint.useast2
          }
    }));

    await client.send(new PutPublicAccessBlockCommand({
        Bucket:staticSite.Bucket,
        ContentMD5:'',
        PublicAccessBlockConfiguration: { // PublicAccessBlockConfiguration
            BlockPublicAcls: false,
            IgnorePublicAcls: false,
            BlockPublicPolicy: false,
            RestrictPublicBuckets: false,
          }
    }))
  
    await client.send(new PutBucketPolicyCommand({
        Bucket:staticSite.Bucket,
        "Policy": JSON.stringify(bucketPolicy)
    }))
    await client.send(new PutBucketWebsiteCommand( {
        Bucket:staticSite.Bucket,
        ContentMD5:"",
    WebsiteConfiguration: { 
        ErrorDocument: { 
          Key: "index.html", 
        },
        IndexDocument: { 
          Suffix: "error.html", 
        }
    }}))
    return s3Details
}