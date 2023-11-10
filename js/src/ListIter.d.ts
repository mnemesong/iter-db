import { ListElem } from "./ListElem";
export declare class ListIter<A> {
    private ref;
    private n;
    private readed;
    constructor(l: ListElem<A> | null, n: number);
    read: () => A;
    next: () => ListIter<A>;
    isFinish: () => boolean;
    hasNext: () => boolean;
    isReaded: () => boolean;
    timestamp: () => number;
    num: () => number;
}
