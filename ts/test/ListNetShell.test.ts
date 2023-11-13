import { describe, it } from "mocha";
import { NetMessage, ListNetShell } from "../src/ListNetShell"
import { ListDb } from "../src/ListDb";
import * as assert from "assert"

class NetMessageMock implements NetMessage {
    private resp: any = undefined
    private body: any

    public constructor(body: any) {
        this.body = body
    }

    public getBody = () => this.body

    public sendResponse = (a: any) => {
        this.resp = a
    }

    public getResponse = () => this.resp
}

describe("test ListNetShell", () => {
    describe("test auth data check", () => {
        it("test invalid auth", () => {
            let db = new ListDb()
            let shell = new ListNetShell(db, "da7s8gdf")
            let msg = new NetMessageMock({ authToken: "21c41241", set: 721637821 })
            shell.handleMessage(msg)
            assert.deepEqual(msg.getResponse(), {
                error: "Invalid auth data"
            })
            assert.equal(db.getCount(), 0)
        })

        it("test valid auth", () => {
            let db = new ListDb()
            let shell = new ListNetShell(db, "da7s8gdf")
            let msg = new NetMessageMock({ authToken: "da7s8gdf", set: 721637821 })
            shell.handleMessage(msg)
            assert.deepEqual(msg.getResponse(), {
                id: 0
            })
            assert.equal(db.getCount(), 1)
        })
    })

    describe("test format of request check", () => {
        it("test invalid format 1", () => {
            let db = new ListDb()
            let shell = new ListNetShell(db, "da7s8gdf")
            let msg = new NetMessageMock({ authToken: "da7s8gdf", get: 721637821 })
            shell.handleMessage(msg)
            assert.deepEqual(msg.getResponse(), {
                error: "Invalid format of request"
            })
            assert.equal(db.getCount(), 0)
        })

        it("test invalid format 2", () => {
            let db = new ListDb()
            let shell = new ListNetShell(db, "da7s8gdf")
            let msg = new NetMessageMock({ authToken: "da7s8gdf", req: { faksf: null } })
            shell.handleMessage(msg)
            assert.deepEqual(msg.getResponse(), {
                error: "Invalid format of request"
            })
            assert.equal(db.getCount(), 0)
        })

        it("test valid format", () => {
            let db = new ListDb()
            let shell = new ListNetShell(db, "da7s8gdf")
            let msg = new NetMessageMock({ authToken: "da7s8gdf", set: 721637821 })
            shell.handleMessage(msg)
            assert.deepEqual(msg.getResponse(), {
                id: 0
            })
            assert.equal(db.getCount(), 1)
        })
    })

    describe("test invalid iter", () => {
        it("test invalid iter", () => {
            let db = new ListDb()
            db.push({ v: 1234 })
            db.push({ v: 74812 })
            let iterId = db.regIter()
            let shell = new ListNetShell(db, "da7s8gdf")
            let msg = new NetMessageMock({
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
            let db = new ListDb()
            db.push({ v: 1234 })
            db.push({ v: 74812 })
            let iterId = db.regIter()
            let shell = new ListNetShell(db, "da7s8gdf")
            let msg = new NetMessageMock({
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

    describe("test batcNew", () => {
        it("test 1", () => {
            let db = new ListDb()
            db.push({ v: 1234 })
            db.push({ v: 74812 })
            db.push({ v: 8619312 })
            db.push({ v: 412 })
            let iterId = db.regIter()
            let shell = new ListNetShell(db, "da7s8gdf")
            let msg1 = new NetMessageMock({
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
            let msg2 = new NetMessageMock({
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
            let msg3 = new NetMessageMock({
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
})