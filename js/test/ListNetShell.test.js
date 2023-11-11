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
var mocha_1 = require("mocha");
var ListNetShell_1 = require("../src/ListNetShell");
var ListDb_1 = require("../src/ListDb");
var assert = __importStar(require("assert"));
var NetMessageMock = /** @class */ (function () {
    function NetMessageMock(body) {
        var _this = this;
        this.resp = undefined;
        this.getBody = function () { return _this.body; };
        this.sendResponse = function (a) {
            _this.resp = a;
        };
        this.getResponse = function () { return _this.resp; };
        this.body = body;
    }
    return NetMessageMock;
}());
(0, mocha_1.describe)("test ListNetShell", function () {
    (0, mocha_1.describe)("test auth data check", function () {
        (0, mocha_1.it)("test invalid auth", function () {
            var db = new ListDb_1.ListDb();
            var shell = new ListNetShell_1.ListNetShell(db, "da7s8gdf");
            var msg = new NetMessageMock({ authToken: "21c41241", set: 721637821 });
            shell.handleMessage(msg);
            assert.deepEqual(msg.getResponse(), {
                error: "Invalid auth data"
            });
            assert.equal(db.getCount(), 0);
        });
        (0, mocha_1.it)("test valid auth", function () {
            var db = new ListDb_1.ListDb();
            var shell = new ListNetShell_1.ListNetShell(db, "da7s8gdf");
            var msg = new NetMessageMock({ authToken: "da7s8gdf", set: 721637821 });
            shell.handleMessage(msg);
            assert.deepEqual(msg.getResponse(), {
                id: 0
            });
            assert.equal(db.getCount(), 1);
        });
    });
});
