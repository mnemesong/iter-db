import { describe, it } from "mocha";
import { ListDb } from "../src/ListDb";
import * as assert from "assert"

describe("test ListDb", () => {
    it("test scenario 1", () => {
        const db: ListDb<any> = (new ListDb())
            .push(12)
            .push("John Konor")
            .push([false, true, false])
        const iterId = db.regIter()
        assert.ok(iterId.length > 0)
        const iter = db.getIter(iterId)
        assert.ok(iter.isReaded() === false)
        assert.equal(iter.read(), 12)
    })
})