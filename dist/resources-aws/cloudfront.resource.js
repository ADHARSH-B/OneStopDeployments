"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCloudfront = void 0;
const client_cloudfront_1 = require("@aws-sdk/client-cloudfront");
const createCloudfront = () => __awaiter(void 0, void 0, void 0, function* () {
    const cloudfront = new client_cloudfront_1.CloudFront();
    const cloudFrontParams = {
        DistributionConfig: {
            CallerReference: 'adharsha',
            Comment: 'Your distribution comment',
            DefaultRootObject: 'index.html',
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
    cloudfront.createDistribution(cloudFrontParams);
});
exports.createCloudfront = createCloudfront;
