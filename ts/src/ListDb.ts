import { ListIter } from "./ListIter";
import { v4 as uuid } from "uuid";

export type arr<A> = { arr: A[] }

export class ListDb<A> {
    private iters: Record<string, ListIter<A>> = {}
    private arr: arr<A> = { arr: [] }

    public push = (val: A): number => {
        const len = this.arr.arr.push(val)
        return len - 1
    }

    public clean = (): void => {
        delete this.iters
        delete this.arr
        this.iters = {}
        this.arr = { arr: [] }
    }

    public regIter = (): string => {
        const id = uuid()
        this.iters[id] = new ListIter(this.arr, 0)
        return id
    }

    public getCount = () => this.arr.arr.length

    public getIter = (id: string): ListIter<A> | undefined => {
        if (this.iters[id]) {
            return this.iters[id]
        }
        return undefined
    }

    public dropIter = (id: string): void => {
        if (this.iters[id]) {
            delete this.iters[id]
        }
    }

    public serializeToJson = (): string => {
        const dataClone = [...this.arr.arr]
        return JSON.stringify(dataClone)
    }

    public parseFromJson = (json: string): void => {
        this.clean()
        const data = JSON.parse(json)
        if (!Array.isArray(data)) {
            throw new Error("parsed data is not array")
        }
        this.arr.arr = data
    }
}