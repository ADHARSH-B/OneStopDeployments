"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUILDTYPE = void 0;
var BUILDTYPE;
(function (BUILDTYPE) {
    BUILDTYPE[BUILDTYPE["ECS"] = 0] = "ECS";
    BUILDTYPE[BUILDTYPE["S3"] = 1] = "S3";
    BUILDTYPE[BUILDTYPE["EC2"] = 2] = "EC2";
})(BUILDTYPE || (exports.BUILDTYPE = BUILDTYPE = {}));
