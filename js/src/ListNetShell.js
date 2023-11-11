"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNetShell = void 0;
var ListNetShell = /** @class */ (function () {
    function ListNetShell(db, token) {
        var _this = this;
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
                    var reqKeys = Object.keys(req);
                    if (reqKeys.includes("batchNew") && (typeof req["batchNew"] === "number")) {
                        var result = [];
                        for (var i = 0; i < req["batchNew"]; i++) {
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
                        if (iter.isFinish()) {
                            msg.sendResponse({ val: null });
                            return;
                        }
                        if (iter.isReaded()) {
                            iter.next();
                            if (iter.isFinish()) {
                                msg.sendResponse({ val: null });
                                return;
                            }
                            msg.sendResponse({ val: { id: iter.num(), val: iter.read() } });
                            return;
                        }
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
    }
    return ListNetShell;
}());
exports.ListNetShell = ListNetShell;
