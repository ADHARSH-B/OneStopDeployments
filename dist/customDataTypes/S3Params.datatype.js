"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationConstraint = exports.s3ACL = void 0;
var s3ACL;
(function (s3ACL) {
    s3ACL["private"] = "private";
    s3ACL["publicread"] = "public-read";
    s3ACL["publicreadwrite"] = "public-read-write";
    s3ACL["authenticatedread"] = "authenticated-read";
})(s3ACL || (exports.s3ACL = s3ACL = {}));
var LocationConstraint;
(function (LocationConstraint) {
    LocationConstraint["afsouth1"] = "af-south-1";
    LocationConstraint["apeast1"] = "ap-east-1";
    LocationConstraint["apnortheast1"] = "ap-northeast-1";
    LocationConstraint["apnortheast2"] = "ap-northeast-2";
    LocationConstraint["apnortheast3"] = "ap-northeast-3";
    LocationConstraint["apsouth1"] = "ap-south-1";
    LocationConstraint["apsoutheast1"] = "ap-southeast-1";
    LocationConstraint["apsoutheast2"] = "ap-southeast-2";
    LocationConstraint["apsoutheast3"] = "ap-southeast-3";
    LocationConstraint["cacentral1"] = "ca-central-1";
    LocationConstraint["cnnorth1"] = "cn-north-1";
    LocationConstraint["useast1"] = "us-east-1";
    LocationConstraint["cnnorthwest1"] = "cn-northwest-1";
    LocationConstraint["EU"] = "EU";
    LocationConstraint["eucentral1"] = "eu-central-1";
    LocationConstraint["eunorth1"] = "eu-north-1";
    LocationConstraint["eusouth1"] = "eu-south-1";
    LocationConstraint["euwest1"] = "eu-west-1";
    LocationConstraint["euwest2"] = "eu-west-2";
    LocationConstraint["euwest3"] = "eu-west-3";
    LocationConstraint["mesouth1"] = "me-south-1";
    LocationConstraint["saeast1"] = "sa-east-1";
    LocationConstraint["useast2"] = "us-east-2";
    LocationConstraint["usgoveast1"] = "us-gov-east-1";
    LocationConstraint["uswest1"] = "us-west-1";
    LocationConstraint["uswest2"] = "us-west-2";
    LocationConstraint["apsouth2"] = "ap-south-2";
    LocationConstraint["eusouth2"] = "eu-south-2";
})(LocationConstraint || (exports.LocationConstraint = LocationConstraint = {}));
var ObjectOwnership;
(function (ObjectOwnership) {
    ObjectOwnership["BucketOwnerPreferred"] = "BucketOwnerPreferred";
    ObjectOwnership["ObjectWriter"] = "ObjectWriter";
    ObjectOwnership["BucketOwnerEnforced"] = "BucketOwnerEnforced";
})(ObjectOwnership || (ObjectOwnership = {}));
var ChecksumAlgorithm;
(function (ChecksumAlgorithm) {
    ChecksumAlgorithm["CRC32"] = "CRC32";
    ChecksumAlgorithm["CRC32C"] = "CRC32C";
    ChecksumAlgorithm["SHA1"] = "SHA1";
    ChecksumAlgorithm["SHA256"] = "SHA256";
})(ChecksumAlgorithm || (ChecksumAlgorithm = {}));
var Protocol;
(function (Protocol) {
    Protocol["http"] = "http";
    Protocol["https"] = "https";
})(Protocol || (Protocol = {}));
