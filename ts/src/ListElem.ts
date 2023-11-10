export class ListElem<A> {
    private val: A
    private timestamp: number
    private next: ListElem<A> | null

    constructor(val: A) {
        this.val = val
    }

    public getVal = () => this.val

    public goNext = () => this.next

    public setNext = (l: ListElem<A>): ListElem<A> => {
        this.next = l
        return this
    }
}