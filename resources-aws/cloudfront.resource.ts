import {CloudFront} from "@aws-sdk/client-cloudfront"



export const createCloudfront = async()=>{
    const cloudfront = new CloudFront()
    const cloudFrontParams:any = {
        DistributionConfig: {
          CallerReference: 'adharsha', // A unique reference for this distribution
          Comment: 'Your distribution comment',
          DefaultRootObject: 'index.html', // Default root object for your distribution
          Origins: {
            Quantity: 1,
            Items: [
              {
                Id: 'S3-origin',
                DomainName: 'angularappbucketas.s3.us-east-1.amazonaws.com', 
                S3OriginConfig: {
                  OriginAccessIdentity: '', // Leave empty for public S3 buckets
                },
              },
            ],
          },
          DefaultCacheBehavior: {
            TargetOriginId: 'S3-origin',
            ForwardedValues: {
              QueryString: false,
              Cookies: {
                Forward: 'all', 
              },
            },
            ViewerProtocolPolicy: 'allow-all',
            MinTTL: 3600
          },
      
          Enabled: true, 
        },
      };
      

cloudfront.createDistribution(cloudFrontParams)
}