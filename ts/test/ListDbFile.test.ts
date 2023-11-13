import { describe, it } from "mocha";
import { IterDbShell } from "../src/IterDbShell"
import { IterDb } from "../src/IterDb";
import * as assert from "assert"
import { IterDbMessage } from "../src/IterDbMessage";
import * as path from "path";
import * as fs from "fs"

describe("test file in list-db", () => {
    it("test 1", () => {
        const db = new IterDb()
        const filepath = path
            .resolve((module as unknown as { path: string }).path, "..", "..", "test.json")
        const shell = new IterDbShell(db, {
            token: "7gx1827b",
            filepath: filepath,
            unref: true,
            fileDelay: 1000
        })
        shell.handleMessage(new IterDbMessage({
            authToken: "7gx1827b",
            set: { v: 216318729 }
        }))
        setTimeout(() => {
            assert.deepEqual(JSON.parse(fs.readFileSync(filepath).toString()), [
                { v: 216318729 }
            ])
            shell.handleMessage(new IterDbMessage({
                authToken: "7gx1827b",
                set: { a: "7by821c4", b: ["873142h981", "841h9"] }
            }))
            setTimeout(() => {
                assert.deepEqual(JSON.parse(fs.readFileSync(filepath).toString()), [
                    { v: 216318729 },
                    { a: "7by821c4", b: ["873142h981", "841h9"] }
                ])
                fs.unlinkSync(filepath)
            }, 1500)
        }, 1500)
    })

    it("test 2", () => {
        const db = new IterDb()
        const filepath = path
            .resolve((module as unknown as { path: string }).path, "..", "..", "test2.json")
        fs.writeFileSync(filepath, '[{"kasd": "asdyb8", "l": [213, 412]}]')
        const shell = new IterDbShell(db, {
            token: "7gx1827b",
            filepath: filepath,
            unref: true,
            fileDelay: 2000
        })
        assert.deepEqual(db.getAll(), [{ "kasd": "asdyb8", "l": [213, 412] }])
        shell.handleMessage(new IterDbMessage({
            authToken: "7gx1827b",
            set: { v: 216318729 }
        }))
        shell.handleMessage(new IterDbMessage({
            authToken: "7gx1827b",
            set: { a: "7by821c4", b: ["873142h981", "841h9"] }
        }))
        setTimeout(() => {
            assert.deepEqual(JSON.parse(fs.readFileSync(filepath).toString()), [
                { kasd: "asdyb8", l: [213, 412] },
                { v: 216318729 },
                { a: "7by821c4", b: ["873142h981", "841h9"] }
            ])
            fs.unlinkSync(filepath)
        }, 2500)
    })
})