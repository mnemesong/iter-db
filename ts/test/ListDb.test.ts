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
        assert.ok(!iter.isReaded())
        assert.equal(iter.read(), 12)
        assert.ok(iter.isReaded())
        assert.ok(iter.hasNext())
        assert.ok(iter.next())
        assert.ok(!iter.isReaded())
        assert.equal(iter.read(), "John Konor")
        db.push(999)
        assert.ok(iter.isReaded())
        assert.ok(Array.isArray(iter.next().read()))
        assert.equal(iter.next().read(), 999)
        assert.ok(!iter.hasNext())
    })

    it("test scenario 1", () => {
        const db: ListDb<any> = (new ListDb())
            .push(12)
            .push("John Konor")
            .push([false, true, false])
        const iterId = db.regIter()
        assert.ok(iterId.length > 0)
        const iter = db.getIter(iterId)
        assert.ok(!iter.isReaded())
        assert.equal(iter.read(), 12)
        assert.ok(iter.isReaded())
        assert.ok(iter.hasNext())
        assert.ok(iter.next())
        assert.ok(!iter.isReaded())
        assert.equal(iter.read(), "John Konor")
        const iter2Id = db.regIter()
        const iter2 = db.getIter(iter2Id)
        db.push(999)
        assert.ok(iter.isReaded())
        assert.ok(Array.isArray(iter.next().read()))
        assert.equal(iter.next().read(), 999)
        assert.ok(!iter2.isReaded())
        assert.equal(iter2.read(), 12)
        assert.equal(iter2.next().read(), "John Konor")
    })
})