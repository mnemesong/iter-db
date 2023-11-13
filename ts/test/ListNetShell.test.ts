import { describe, it } from "mocha";
import { IterDbShell } from "../src/IterDbShell"
import { IterDb } from "../src/IterDb";
import * as assert from "assert"
import { IterDbMessage } from "../src/IterDbMessage";

describe("test ListDbShell", () => {
    describe("test auth data check", () => {
        it("test invalid auth", () => {
            let db = new IterDb()
            let shell = new IterDbShell(db, { token: "da7s8gdf" })
            let msg = new IterDbMessage({ authToken: "21c41241", set: 721637821 })
            shell.handleMessage(msg)
            assert.deepEqual(msg.getResponse(), {
                error: "Invalid auth data"
            })
            assert.equal(db.getCount(), 0)
        })

        it("test valid auth", () => {
            let db = new IterDb()
            let shell = new IterDbShell(db, { token: "da7s8gdf" })
            let msg = new IterDbMessage({ authToken: "da7s8gdf", set: 721637821 })
            shell.handleMessage(msg)
            assert.deepEqual(msg.getResponse(), {
                id: 0
            })
            assert.equal(db.getCount(), 1)
        })
    })

    describe("test format of request check", () => {
        it("test invalid format 1", () => {
            let db = new IterDb()
            let shell = new IterDbShell(db, { token: "da7s8gdf" })
            let msg = new IterDbMessage({ authToken: "da7s8gdf", get: 721637821 })
            shell.handleMessage(msg)
            assert.deepEqual(msg.getResponse(), {
                error: "Invalid format of request"
            })
            assert.equal(db.getCount(), 0)
        })

        it("test invalid format 2", () => {
            let db = new IterDb()
            let shell = new IterDbShell(db, { token: "da7s8gdf" })
            let msg = new IterDbMessage({ authToken: "da7s8gdf", req: { faksf: null } })
            shell.handleMessage(msg)
            assert.deepEqual(msg.getResponse(), {
                error: "Invalid format of request"
            })
            assert.equal(db.getCount(), 0)
        })

        it("test valid format", () => {
            let db = new IterDb()
            let shell = new IterDbShell(db, { token: "da7s8gdf" })
            let msg = new IterDbMessage({ authToken: "da7s8gdf", set: 721637821 })
            shell.handleMessage(msg)
            assert.deepEqual(msg.getResponse(), {
                id: 0
            })
            assert.equal(db.getCount(), 1)
        })
    })

    describe("test invalid iter", () => {
        it("test invalid iter", () => {
            let db = new IterDb()
            db.push({ v: 1234 })
            db.push({ v: 74812 })
            let iterId = db.regIter()
            let shell = new IterDbShell(db, { token: "da7s8gdf" })
            let msg = new IterDbMessage({
                authToken: "da7s8gdf",
                req: { iter: "iterId", req: { oneNew: true } }
            })
            shell.handleMessage(msg)
            assert.deepEqual(msg.getResponse(), {
                error: "Iter is not exists"
            })
            assert.equal(db.getCount(), 2)
        })

        it("test valid iter", () => {
            let db = new IterDb()
            db.push({ v: 1234 })
            db.push({ v: 74812 })
            let iterId = db.regIter()
            let shell = new IterDbShell(db, { token: "da7s8gdf" })
            let msg = new IterDbMessage({
                authToken: "da7s8gdf",
                req: { iter: iterId, req: { oneNew: true } }
            })
            shell.handleMessage(msg)
            assert.deepEqual(msg.getResponse(), {
                val: {
                    id: 0,
                    val: { v: 1234 }
                }
            })
            assert.equal(db.getCount(), 2)
        })
    })

    describe("test batchNew", () => {
        it("test 1", () => {
            let db = new IterDb()
            db.push({ v: 1234 })
            db.push({ v: 74812 })
            db.push({ v: 8619312 })
            db.push({ v: 412 })
            let iterId = db.regIter()
            let shell = new IterDbShell(db, { token: "da7s8gdf" })
            let msg1 = new IterDbMessage({
                authToken: "da7s8gdf",
                req: { iter: iterId, req: { batchNew: 3 } }
            })
            shell.handleMessage(msg1)
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
            })
            let msg2 = new IterDbMessage({
                authToken: "da7s8gdf",
                req: { iter: iterId, req: { batchNew: 3 } }
            })
            shell.handleMessage(msg2)
            assert.deepEqual(msg2.getResponse(), {
                vals: [
                    {
                        id: 3,
                        val: { v: 412 }
                    },
                ]
            })
            let msg3 = new IterDbMessage({
                authToken: "da7s8gdf",
                req: { iter: iterId, req: { batchNew: 3 } }
            })
            shell.handleMessage(msg3)
            assert.deepEqual(msg3.getResponse(), {
                vals: [
                ]
            })
            assert.equal(db.getCount(), 4)
        })
    })

    describe("test again", () => {
        it("test valid iter", () => {
            let db = new IterDb()
            db.push({ v: 1234 })
            db.push({ v: 74812 })
            let iterId = db.regIter()
            let shell = new IterDbShell(db, { token: "da7s8gdf" })
            let msg1 = new IterDbMessage({
                authToken: "da7s8gdf",
                req: { iter: iterId, req: { again: true } }
            })
            shell.handleMessage(msg1)
            assert.deepEqual(msg1.getResponse(), {
                val: {
                    id: 0,
                    val: { v: 1234 }
                }
            })
            let msg2 = new IterDbMessage({
                authToken: "da7s8gdf",
                req: { iter: iterId, req: { again: true } }
            })
            shell.handleMessage(msg2)
            assert.deepEqual(msg2.getResponse(), {
                val: {
                    id: 0,
                    val: { v: 1234 }
                }
            })
            assert.equal(db.getCount(), 2)
        })
    })

    describe("test reg", () => {
        it("reg", () => {
            let db = new IterDb()
            db.push({ v: 1234 })
            db.push({ v: 74812 })
            let shell = new IterDbShell(db, { token: "da7s8gdf" })
            let msg1 = new IterDbMessage({
                authToken: "da7s8gdf",
                reg: true
            })
            shell.handleMessage(msg1)
            const iter1 = msg1.getResponse()["iter"]
            assert.ok(typeof iter1 === "string")
            let msg2 = new IterDbMessage({
                authToken: "da7s8gdf",
                reg: true
            })
            shell.handleMessage(msg2)
            const iter2 = msg2.getResponse()["iter"]
            assert.ok(typeof iter2 === "string")
            assert.notEqual(iter1, iter2)
            let msg3 = new IterDbMessage({
                authToken: "da7s8gdf",
                req: { iter: iter2, req: { oneNew: true } }
            })
            shell.handleMessage(msg3)
            assert.deepEqual(msg3.getResponse(), { val: { id: 0, val: { v: 1234 } } })
        })
    })
})