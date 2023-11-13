type arr<A> = { arr: A[] }

export class ListIter<A> {
    private arr: arr<A>
    private n: number
    private readed: boolean = false

    public constructor(arr: arr<A> | null, n: number) {
        this.arr = arr
        this.n = Math.round(n)
    }

    public read = (): A | undefined => {
        if (!this.isFinish()) {
            this.readed = true
            return this.arr.arr[this.n]
        }
        return undefined
    }

    public next = (): ListIter<A> => {
        this.n++
        this.readed = false
        return this
    }

    public isFinish = (): boolean => {
        return this.n >= this.arr.arr.length
    }

    public isReaded = () => this.readed

    public num = () => this.n;
}