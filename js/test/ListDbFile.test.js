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
var IterDbShell_1 = require("../src/IterDbShell");
var IterDb_1 = require("../src/IterDb");
var assert = __importStar(require("assert"));
var IterDbMessage_1 = require("../src/IterDbMessage");
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
(0, mocha_1.describe)("test file in list-db", function () {
    (0, mocha_1.it)("test 1", function () {
        var db = new IterDb_1.IterDb();
        var filepath = path
            .resolve(module.path, "..", "..", "test.json");
        var shell = new IterDbShell_1.IterDbShell(db, {
            token: "7gx1827b",
            filepath: filepath,
            unref: true,
            fileDelay: 1000
        });
        shell.handleMessage(new IterDbMessage_1.IterDbMessage({
            authToken: "7gx1827b",
            set: { v: 216318729 }
        }));
        setTimeout(function () {
            assert.deepEqual(JSON.parse(fs.readFileSync(filepath).toString()), [
                { v: 216318729 }
            ]);
            shell.handleMessage(new IterDbMessage_1.IterDbMessage({
                authToken: "7gx1827b",
                set: { a: "7by821c4", b: ["873142h981", "841h9"] }
            }));
            setTimeout(function () {
                assert.deepEqual(JSON.parse(fs.readFileSync(filepath).toString()), [
                    { v: 216318729 },
                    { a: "7by821c4", b: ["873142h981", "841h9"] }
                ]);
                fs.unlinkSync(filepath);
            }, 1500);
        }, 1500);
    });
    (0, mocha_1.it)("test 2", function () {
        var db = new IterDb_1.IterDb();
        var filepath = path
            .resolve(module.path, "..", "..", "test2.json");
        fs.writeFileSync(filepath, '[{"kasd": "asdyb8", "l": [213, 412]}]');
        var shell = new IterDbShell_1.IterDbShell(db, {
            token: "7gx1827b",
            filepath: filepath,
            unref: true,
            fileDelay: 2000
        });
        assert.deepEqual(db.getAll(), [{ "kasd": "asdyb8", "l": [213, 412] }]);
        shell.handleMessage(new IterDbMessage_1.IterDbMessage({
            authToken: "7gx1827b",
            set: { v: 216318729 }
        }));
        shell.handleMessage(new IterDbMessage_1.IterDbMessage({
            authToken: "7gx1827b",
            set: { a: "7by821c4", b: ["873142h981", "841h9"] }
        }));
        setTimeout(function () {
            assert.deepEqual(JSON.parse(fs.readFileSync(filepath).toString()), [
                { kasd: "asdyb8", l: [213, 412] },
                { v: 216318729 },
                { a: "7by821c4", b: ["873142h981", "841h9"] }
            ]);
            fs.unlinkSync(filepath);
        }, 2500);
    });
});
