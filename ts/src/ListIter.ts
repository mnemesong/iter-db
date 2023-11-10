import { ListElem } from "./ListElem"

export class ListIter<A> {
    private ref: ListElem<A> | null
    private n: number
    private readed: boolean = false

    public constructor(l: ListElem<A> | null, n: number) {
        this.ref = l
        this.n = Math.round(n)
    }

    public read = (): A => {
        this.readed = true
        return this.ref.getVal()
    }

    public next = (): ListIter<A> => {
        this.ref = this.ref.goNext()
        this.n++
        this.readed = false
        return this
    }

    public isFinish = (): boolean => {
        return this.ref === null
    }

    public hasNext = (): boolean => {
        return !!this.ref.goNext()
    }

    public isReaded = () => this.readed
}