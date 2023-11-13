"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IterDbMessage = void 0;
var IterReq_1 = require("./IterReq");
var IterResp_1 = require("./IterResp");
var IterDbMessage = /** @class */ (function () {
    function IterDbMessage(body) {
        var _this = this;
        this.resp = null;
        this.getBody = function () { return _this.body; };
        this.sendResponse = function (a) {
            if (!IterResp_1.iterRespStruct.is(a)) {
                _this.resp = {
                    error: "Unexcepted error",
                    details: "Invalid format of response: " + JSON.stringify(a)
                };
                return;
            }
            _this.resp = a;
        };
        this.getResponse = function () {
            if (_this.resp === null) {
                throw new Error("No response");
            }
            return _this.resp;
        };
        if (!IterReq_1.reqIterBodyStruct.is(body)) {
            this.body = null;
            this.resp = {
                error: "Invalid format of request"
            };
        }
        this.body = body;
    }
    return IterDbMessage;
}());
exports.IterDbMessage = IterDbMessage;
