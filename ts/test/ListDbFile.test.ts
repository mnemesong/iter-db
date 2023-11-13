import { describe, it } from "mocha";
import { ListDbShell } from "../src/ListDbShell"
import { ListDb } from "../src/ListDb";
import * as assert from "assert"
import { ListDbMessage } from "../src/ListDbMessage";
import * as path from "path";
import * as fs from "fs"

describe("test file in list-db", () => {
    const db = new ListDb()
    const filepath = path.resolve((module as unknown as { path: string }).path, "..", "..", "test.json")
    const shell = new ListDbShell(db, {
        token: "7gx1827b",
        filepath: filepath,
        unref: true,
        fileDelay: 1000
    })
    it("test 1", () => {
        shell.handleMessage(new ListDbMessage({
            authToken: "7gx1827b",
            set: { v: 216318729 }
        }))
        const t1 = setTimeout(() => {
            assert.deepEqual(JSON.parse(fs.readFileSync(filepath).toString()), [
                { v: 216318729 }
            ])
            shell.handleMessage(new ListDbMessage({
                authToken: "7gx1827b",
                set: { a: "7by821c4", b: ["873142h981", "841h9"] }
            }))
            const t2 = setTimeout(() => {
                assert.deepEqual(JSON.parse(fs.readFileSync(filepath).toString()), [
                    { v: 216318729 },
                    { a: "7by821c4", b: ["873142h981", "841h9"] }
                ])
                fs.unlinkSync(filepath)
            }, 1500)
        }, 1500)
    })
})