import { ListIter } from "./ListIter";
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
}
