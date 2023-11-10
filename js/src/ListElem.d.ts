export declare class ListElem<A> {
    private val;
    private timestamp;
    private next;
    constructor(val: A);
    getVal: () => A;
    goNext: () => ListElem<A>;
    setNext: (l: ListElem<A>) => ListElem<A>;
}
