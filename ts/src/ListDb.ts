import { ListElem } from "./ListElem";
import { ListIter } from "./ListIter";
import { v4 as uuid } from "uuid";

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
            this.last = this.last.setNext(new ListElem(val)).goNext()
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

}