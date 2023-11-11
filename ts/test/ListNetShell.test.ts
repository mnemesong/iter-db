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
})