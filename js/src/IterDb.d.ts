import { IterIter } from "./IterIter";
export type arr<A> = {
    arr: A[];
};
export declare class IterDb<A> {
    private iters;
    private arr;
    push: (val: A) => number;
    clean: () => void;
    regIter: () => string;
    getCount: () => number;
    getIter: (id: string) => IterIter<A> | undefined;
    dropIter: (id: string) => void;
    serializeToJson: () => string;
    getAll: () => A[];
    parseFromJson: (json: string) => void;
}
