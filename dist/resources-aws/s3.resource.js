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
exports.createS3BuckerAsStatisSite = exports.createS3Bucket = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const client = new client_s3_1.S3Client({ region: "us-east-1" });
const createS3Bucket = (createS3Params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client.send(new client_s3_1.CreateBucketCommand({
        Bucket: createS3Params.Bucket,
        // CreateBucketConfiguration: { // CreateBucketConfiguration
        //     LocationConstraint:LocationConstraint.useast1
        //   }
    }));
});
exports.createS3Bucket = createS3Bucket;
const createS3BuckerAsStatisSite = (staticSite) => __awaiter(void 0, void 0, void 0, function* () {
    const bucketPolicy = {
        Version: '2012-10-17',
        Statement: [
            {
                Sid: 'PublicReadGetObject',
                Effect: 'Allow',
                Principal: '*',
                Action: 's3:GetObject',
                Resource: [`arn:aws:s3:::${staticSite.Bucket}/*`, `arn:aws:s3:::${staticSite.Bucket}`]
            }
        ]
    };
    const s3Details = yield client.send(new client_s3_1.CreateBucketCommand({
        Bucket: staticSite.Bucket,
        // CreateBucketConfiguration: { // CreateBucketConfiguration
        //     LocationConstraint:LocationConstraint.useast1
        //   }
    }));
    yield client.send(new client_s3_1.PutPublicAccessBlockCommand({
        Bucket: staticSite.Bucket,
        ContentMD5: '',
        PublicAccessBlockConfiguration: {
            BlockPublicAcls: false,
            IgnorePublicAcls: false,
            BlockPublicPolicy: false,
            RestrictPublicBuckets: false,
        }
    }));
    yield client.send(new client_s3_1.PutBucketPolicyCommand({
        Bucket: staticSite.Bucket,
        "Policy": JSON.stringify(bucketPolicy)
    }));
    yield client.send(new client_s3_1.PutBucketWebsiteCommand({
        Bucket: staticSite.Bucket,
        ContentMD5: "",
        WebsiteConfiguration: {
            ErrorDocument: {
                Key: "index.html",
            },
            IndexDocument: {
                Suffix: "error.html",
            }
        }
    }));
    return s3Details;
});
exports.createS3BuckerAsStatisSite = createS3BuckerAsStatisSite;
