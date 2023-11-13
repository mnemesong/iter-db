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
var ListDbShell_1 = require("../src/ListDbShell");
var ListDb_1 = require("../src/ListDb");
var assert = __importStar(require("assert"));
var ListDbMessage_1 = require("../src/ListDbMessage");
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
(0, mocha_1.describe)("test file in list-db", function () {
    var db = new ListDb_1.ListDb();
    var filepath = path.resolve(module.path, "..", "..", "test.json");
    var shell = new ListDbShell_1.ListDbShell(db, {
        token: "7gx1827b",
        filepath: filepath,
        unref: true,
        fileDelay: 1000
    });
    (0, mocha_1.it)("test 1", function () {
        shell.handleMessage(new ListDbMessage_1.ListDbMessage({
            authToken: "7gx1827b",
            set: { v: 216318729 }
        }));
        var t1 = setTimeout(function () {
            assert.deepEqual(JSON.parse(fs.readFileSync(filepath).toString()), [
                { v: 216318729 }
            ]);
            shell.handleMessage(new ListDbMessage_1.ListDbMessage({
                authToken: "7gx1827b",
                set: { a: "7by821c4", b: ["873142h981", "841h9"] }
            }));
            var t2 = setTimeout(function () {
                assert.deepEqual(JSON.parse(fs.readFileSync(filepath).toString()), [
                    { v: 216318729 },
                    { a: "7by821c4", b: ["873142h981", "841h9"] }
                ]);
                fs.unlinkSync(filepath);
            }, 1500);
        }, 1500);
    });
});
