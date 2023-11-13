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
(0, mocha_1.describe)("test ListDbShell", function () {
    (0, mocha_1.describe)("test auth data check", function () {
        (0, mocha_1.it)("test invalid auth", function () {
            var db = new IterDb_1.IterDb();
            var shell = new IterDbShell_1.IterDbShell(db, { token: "da7s8gdf" });
            var msg = new IterDbMessage_1.IterDbMessage({ authToken: "21c41241", set: 721637821 });
            shell.handleMessage(msg);
            assert.deepEqual(msg.getResponse(), {
                error: "Invalid auth data"
            });
            assert.equal(db.getCount(), 0);
        });
        (0, mocha_1.it)("test valid auth", function () {
            var db = new IterDb_1.IterDb();
            var shell = new IterDbShell_1.IterDbShell(db, { token: "da7s8gdf" });
            var msg = new IterDbMessage_1.IterDbMessage({ authToken: "da7s8gdf", set: 721637821 });
            shell.handleMessage(msg);
            assert.deepEqual(msg.getResponse(), {
                id: 0
            });
            assert.equal(db.getCount(), 1);
        });
    });
    (0, mocha_1.describe)("test format of request check", function () {
        (0, mocha_1.it)("test invalid format 1", function () {
            var db = new IterDb_1.IterDb();
            var shell = new IterDbShell_1.IterDbShell(db, { token: "da7s8gdf" });
            var msg = new IterDbMessage_1.IterDbMessage({ authToken: "da7s8gdf", get: 721637821 });
            shell.handleMessage(msg);
            assert.deepEqual(msg.getResponse(), {
                error: "Invalid format of request"
            });
            assert.equal(db.getCount(), 0);
        });
        (0, mocha_1.it)("test invalid format 2", function () {
            var db = new IterDb_1.IterDb();
            var shell = new IterDbShell_1.IterDbShell(db, { token: "da7s8gdf" });
            var msg = new IterDbMessage_1.IterDbMessage({ authToken: "da7s8gdf", req: { faksf: null } });
            shell.handleMessage(msg);
            assert.deepEqual(msg.getResponse(), {
                error: "Invalid format of request"
            });
            assert.equal(db.getCount(), 0);
        });
        (0, mocha_1.it)("test valid format", function () {
            var db = new IterDb_1.IterDb();
            var shell = new IterDbShell_1.IterDbShell(db, { token: "da7s8gdf" });
            var msg = new IterDbMessage_1.IterDbMessage({ authToken: "da7s8gdf", set: 721637821 });
            shell.handleMessage(msg);
            assert.deepEqual(msg.getResponse(), {
                id: 0
            });
            assert.equal(db.getCount(), 1);
        });
    });
    (0, mocha_1.describe)("test invalid iter", function () {
        (0, mocha_1.it)("test invalid iter", function () {
            var db = new IterDb_1.IterDb();
            db.push({ v: 1234 });
            db.push({ v: 74812 });
            var iterId = db.regIter();
            var shell = new IterDbShell_1.IterDbShell(db, { token: "da7s8gdf" });
            var msg = new IterDbMessage_1.IterDbMessage({
                authToken: "da7s8gdf",
                req: { iter: "iterId", req: { oneNew: true } }
            });
            shell.handleMessage(msg);
            assert.deepEqual(msg.getResponse(), {
                error: "Iter is not exists"
            });
            assert.equal(db.getCount(), 2);
        });
        (0, mocha_1.it)("test valid iter", function () {
            var db = new IterDb_1.IterDb();
            db.push({ v: 1234 });
            db.push({ v: 74812 });
            var iterId = db.regIter();
            var shell = new IterDbShell_1.IterDbShell(db, { token: "da7s8gdf" });
            var msg = new IterDbMessage_1.IterDbMessage({
                authToken: "da7s8gdf",
                req: { iter: iterId, req: { oneNew: true } }
            });
            shell.handleMessage(msg);
            assert.deepEqual(msg.getResponse(), {
                val: {
                    id: 0,
                    val: { v: 1234 }
                }
            });
            assert.equal(db.getCount(), 2);
        });
    });
    (0, mocha_1.describe)("test batchNew", function () {
        (0, mocha_1.it)("test 1", function () {
            var db = new IterDb_1.IterDb();
            db.push({ v: 1234 });
            db.push({ v: 74812 });
            db.push({ v: 8619312 });
            db.push({ v: 412 });
            var iterId = db.regIter();
            var shell = new IterDbShell_1.IterDbShell(db, { token: "da7s8gdf" });
            var msg1 = new IterDbMessage_1.IterDbMessage({
                authToken: "da7s8gdf",
                req: { iter: iterId, req: { batchNew: 3 } }
            });
            shell.handleMessage(msg1);
            assert.deepEqual(msg1.getResponse(), {
                vals: [
                    {
                        id: 0,
                        val: { v: 1234 }
                    },
                    {
                        id: 1,
                        val: { v: 74812 }
                    },
                    {
                        id: 2,
                        val: { v: 8619312 }
                    }
                ]
            });
            var msg2 = new IterDbMessage_1.IterDbMessage({
                authToken: "da7s8gdf",
                req: { iter: iterId, req: { batchNew: 3 } }
            });
            shell.handleMessage(msg2);
            assert.deepEqual(msg2.getResponse(), {
                vals: [
                    {
                        id: 3,
                        val: { v: 412 }
                    },
                ]
            });
            var msg3 = new IterDbMessage_1.IterDbMessage({
                authToken: "da7s8gdf",
                req: { iter: iterId, req: { batchNew: 3 } }
            });
            shell.handleMessage(msg3);
            assert.deepEqual(msg3.getResponse(), {
                vals: []
            });
            assert.equal(db.getCount(), 4);
        });
    });
    (0, mocha_1.describe)("test again", function () {
        (0, mocha_1.it)("test valid iter", function () {
            var db = new IterDb_1.IterDb();
            db.push({ v: 1234 });
            db.push({ v: 74812 });
            var iterId = db.regIter();
            var shell = new IterDbShell_1.IterDbShell(db, { token: "da7s8gdf" });
            var msg1 = new IterDbMessage_1.IterDbMessage({
                authToken: "da7s8gdf",
                req: { iter: iterId, req: { again: true } }
            });
            shell.handleMessage(msg1);
            assert.deepEqual(msg1.getResponse(), {
                val: {
                    id: 0,
                    val: { v: 1234 }
                }
            });
            var msg2 = new IterDbMessage_1.IterDbMessage({
                authToken: "da7s8gdf",
                req: { iter: iterId, req: { again: true } }
            });
            shell.handleMessage(msg2);
            assert.deepEqual(msg2.getResponse(), {
                val: {
                    id: 0,
                    val: { v: 1234 }
                }
            });
            assert.equal(db.getCount(), 2);
        });
    });
    (0, mocha_1.describe)("test reg", function () {
        (0, mocha_1.it)("reg", function () {
            var db = new IterDb_1.IterDb();
            db.push({ v: 1234 });
            db.push({ v: 74812 });
            var shell = new IterDbShell_1.IterDbShell(db, { token: "da7s8gdf" });
            var msg1 = new IterDbMessage_1.IterDbMessage({
                authToken: "da7s8gdf",
                reg: true
            });
            shell.handleMessage(msg1);
            var iter1 = msg1.getResponse()["iter"];
            assert.ok(typeof iter1 === "string");
            var msg2 = new IterDbMessage_1.IterDbMessage({
                authToken: "da7s8gdf",
                reg: true
            });
            shell.handleMessage(msg2);
            var iter2 = msg2.getResponse()["iter"];
            assert.ok(typeof iter2 === "string");
            assert.notEqual(iter1, iter2);
            var msg3 = new IterDbMessage_1.IterDbMessage({
                authToken: "da7s8gdf",
                req: { iter: iter2, req: { oneNew: true } }
            });
            shell.handleMessage(msg3);
            assert.deepEqual(msg3.getResponse(), { val: { id: 0, val: { v: 1234 } } });
        });
    });
});
