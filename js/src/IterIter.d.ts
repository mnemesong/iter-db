type arr<A> = {
    arr: A[];
};
export declare class IterIter<A> {
    private arr;
    private n;
    private readed;
    constructor(arr: arr<A> | null, n: number);
    read: () => A | undefined;
    next: () => IterIter<A>;
    isFinish: () => boolean;
    isReaded: () => boolean;
    num: () => number;
}
export {};
