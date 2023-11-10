import { ListElem } from "./ListElem";
import { ListIter } from "./ListIter";
import { v4 as uuid } from "uuid";

type iterResult<R> = R | {
    error: "Iter is not exists"
} | {
    error: "Iter is finished"
}

type readIterResult<A> = iterResult<{
    id: number,
    val: A,
    timestamp: number
}>

export class ListDb<A> {
    private iters: Record<string, ListIter<A>> = {}
    private first: ListElem<A> | null = null
    private last: ListElem<A> | null = null
    private cnt: number = 0

    public push = (val: A) => {
        if (this.first === null) {
            this.first = new ListElem(val)
            this.last = this.first
            this.cnt = 1
        } else {
            this.last = this.last
                .setNext(new ListElem(val), Date.now())
                .goNext()
            this.cnt++
        }
        return this
    }

    public clean = () => {
        delete this.iters
        delete this.first
        this.iters = {}
        this.first = null
        this.last = null
        this.cnt = 0
        return this
    }

    public regIter = (): string => {
        const id = uuid()
        this.iters[id] = new ListIter(this.first, 0)
        return id
    }

    public getIter = (id: string): ListIter<A> | null => {
        const iter = this.iters[id]
        if (!iter) return null
        return iter
    }

    public getCount = () => this.cnt

    public readIterNext = (id: string): readIterResult<A> | null => {
        let iter = this.getIter(id)
        if (!iter) return { error: "Iter is not exists" }
        if (iter.isFinish()) return { error: "Iter is finished" }
        if (!iter.isReaded()) return {
            id: iter.num(),
            val: iter.read(),
            timestamp: iter.timestamp()
        }
        if (iter.hasNext()) {
            iter = iter.next()
            return this.readIterNext(id)
        }
        return null
    }

    public readIterAgain = (id: string): readIterResult<A> => {
        let iter = this.getIter(id)
        if (!iter) return { error: "Iter is not exists" }
        if (iter.isFinish()) return { error: "Iter is finished" }
        return {
            id: iter.num(),
            val: iter.read(),
            timestamp: iter.timestamp()
        }
    }

    public dropIter = (id: string): iterResult<{ success: true }> => {
        let iter = this.getIter(id)
        if (!iter) return { error: "Iter is not exists" }
        if (iter.isFinish()) return { error: "Iter is finished" }
        delete this.iters[id]
        return { success: true }
    }
}