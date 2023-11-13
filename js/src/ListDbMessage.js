"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListDbMessage = void 0;
var ListReq_1 = require("./ListReq");
var ListResp_1 = require("./ListResp");
var ListDbMessage = /** @class */ (function () {
    function ListDbMessage(body) {
        var _this = this;
        this.resp = null;
        this.getBody = function () { return _this.body; };
        this.sendResponse = function (a) {
            if (!ListResp_1.listRespStruct.is(a)) {
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
        if (!ListReq_1.reqBodyStruct.is(body)) {
            this.body = null;
            this.resp = {
                error: "Invalid format of request"
            };
        }
        this.body = body;
    }
    return ListDbMessage;
}());
exports.ListDbMessage = ListDbMessage;
