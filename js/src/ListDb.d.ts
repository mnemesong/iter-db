import { ListIter } from "./ListIter";
export type arr<A> = {
    arr: A[];
};
export declare class ListDb<A> {
    private iters;
    private arr;
    push: (val: A) => number;
    clean: () => void;
    regIter: () => string;
    getCount: () => number;
    getIter: (id: string) => ListIter<A> | undefined;
    dropIter: (id: string) => void;
    serializeToJson: () => string;
    parseFromJson: (json: string) => void;
}
