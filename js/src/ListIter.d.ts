type arr<A> = {
    arr: A[];
};
export declare class ListIter<A> {
    private arr;
    private n;
    private readed;
    constructor(arr: arr<A> | null, n: number);
    read: () => A | undefined;
    next: () => ListIter<A>;
    isFinish: () => boolean;
    isReaded: () => boolean;
    num: () => number;
}
export {};
