import { ListIter } from "./ListIter";
type iterResult<R> = R | {
    error: "Iter is not exists";
} | {
    error: "Iter is finished";
};
type readIterResult<A> = iterResult<{
    id: number;
    val: A;
    timestamp: number;
}>;
export declare class ListDb<A> {
    private iters;
    private first;
    private last;
    private cnt;
    push: (val: A) => this;
    clean: () => this;
    regIter: () => string;
    getIter: (id: string) => ListIter<A> | null;
    getCount: () => number;
    readIterNext: (id: string) => readIterResult<A> | null;
    readIterAgain: (id: string) => readIterResult<A>;
    dropIter: (id: string) => iterResult<{
        success: true;
    }>;
}
export {};
