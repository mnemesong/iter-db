"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNetShell = void 0;
var fs = __importStar(require("fs"));
var ListNetShell = /** @class */ (function () {
    function ListNetShell(db, token, filepath) {
        if (filepath === void 0) { filepath = null; }
        var _this = this;
        this.timer = null;
        this.isWriting = false;
        this.checkAuth = function (token) { return token === _this.token; };
        this.handleMessage = function (msg) {
            try {
                var body = msg.getBody();
                if (!_this.checkAuth(body.authToken)) {
                    msg.sendResponse({ error: "Invalid auth data" });
                    return;
                }
                if (body["req"]) {
                    var req = body["req"];
                    if ((!req.req) || (!req.iter)) {
                        msg.sendResponse({ error: "Invalid format of request" });
                        return;
                    }
                    var iter = _this.db.getIter(req.iter);
                    if (!iter) {
                        msg.sendResponse({ error: "Iter is not exists" });
                        return;
                    }
                    var reqKeys = Object.keys(req.req);
                    if (reqKeys.includes("batchNew") && (typeof req.req["batchNew"] === "number")) {
                        var result = [];
                        for (var i = 0; i < req.req["batchNew"]; i++) {
                            if (iter.isFinish())
                                continue;
                            if (iter.isReaded()) {
                                iter.next();
                                if (iter.isFinish())
                                    continue;
                                result.push({ id: iter.num(), val: iter.read() });
                            }
                            else {
                                result.push({ id: iter.num(), val: iter.read() });
                            }
                        }
                        msg.sendResponse({ vals: result });
                        return;
                    }
                    if (reqKeys.includes("oneNew")) {
                        if (iter.isReaded()) {
                            iter.next();
                        }
                        if (iter.isFinish()) {
                            msg.sendResponse({ val: null });
                            return;
                        }
                        msg.sendResponse({ val: { id: iter.num(), val: iter.read() } });
                        return;
                    }
                    if (reqKeys.includes("again")) {
                        if (iter.isFinish()) {
                            msg.sendResponse({ val: null });
                            return;
                        }
                        msg.sendResponse({ val: { id: iter.num(), val: iter.read() } });
                        return;
                    }
                    msg.sendResponse({ error: "Invalid format of request" });
                    return;
                }
                if (body["set"]) {
                    msg.sendResponse({ id: _this.db.push(body["set"]) });
                    return;
                }
                if (body["reg"]) {
                    msg.sendResponse({ iter: _this.db.regIter() });
                    return;
                }
                msg.sendResponse({ error: "Invalid format of request" });
                return;
            }
            catch (e) {
                msg.sendResponse({
                    error: "Unexcepted error",
                    details: JSON.stringify(e)
                });
            }
        };
        this.db = db;
        this.token = token;
        if (this.filePath) {
            var data = fs.readFileSync(filepath).toString();
            db.parseFromJson(data);
            this.timer = setInterval(function () {
                if (!_this.isWriting) {
                    _this.isWriting = true;
                    fs.writeFileSync(filepath, db.serializeToJson());
                    _this.isWriting = false;
                }
            }, 3000);
        }
    }
    return ListNetShell;
}());
exports.ListNetShell = ListNetShell;
