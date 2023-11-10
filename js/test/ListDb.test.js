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
var ListDb_1 = require("../src/ListDb");
var assert = __importStar(require("assert"));
(0, mocha_1.describe)("test ListDb", function () {
    (0, mocha_1.it)("test scenario 1", function () {
        var db = (new ListDb_1.ListDb())
            .push(12)
            .push("John Konor")
            .push([false, true, false]);
        var iterId = db.regIter();
        assert.ok(iterId.length > 0);
        var iter = db.getIter(iterId);
        assert.ok(!iter.isReaded());
        assert.equal(iter.read(), 12);
        assert.ok(iter.isReaded());
        assert.ok(iter.hasNext());
        assert.ok(iter.next());
        assert.ok(!iter.isReaded());
        assert.equal(iter.read(), "John Konor");
        db.push(999);
        assert.ok(iter.isReaded());
        assert.ok(Array.isArray(iter.next().read()));
        assert.equal(iter.next().read(), 999);
        assert.ok(!iter.hasNext());
    });
    (0, mocha_1.it)("test scenario 1", function () {
        var db = (new ListDb_1.ListDb())
            .push(12)
            .push("John Konor")
            .push([false, true, false]);
        var iterId = db.regIter();
        assert.ok(iterId.length > 0);
        var iter = db.getIter(iterId);
        assert.ok(!iter.isReaded());
        assert.equal(iter.read(), 12);
        assert.ok(iter.isReaded());
        assert.ok(iter.hasNext());
        assert.ok(iter.next());
        assert.ok(!iter.isReaded());
        assert.equal(iter.read(), "John Konor");
        var iter2Id = db.regIter();
        var iter2 = db.getIter(iter2Id);
        db.push(999);
        assert.ok(iter.isReaded());
        assert.ok(Array.isArray(iter.next().read()));
        assert.equal(iter.next().read(), 999);
        assert.ok(!iter2.isReaded());
        assert.equal(iter2.read(), 12);
        assert.equal(iter2.next().read(), "John Konor");
    });
});
