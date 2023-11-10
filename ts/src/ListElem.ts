export class ListElem<A> {
    private val: A
    private timestamp: number
    private next: ListElem<A> | null

    constructor(val: A) {
        this.val = val
    }

    public getVal = () => this.val

    public goNext = () => this.next

    public setNext = (l: ListElem<A>, t: number): ListElem<A> => {
        this.next = l
        this.timestamp = t
        return this
    }

    public getTimestamp = () => this.timestamp
}