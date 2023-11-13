import { ListDb } from "./ListDb";
export type reqIter = {
    iter: string;
    req: {
        batchNew: number;
    } | {
        oneNew: true;
    } | {
        again: true;
    };
};
export type body = {
    authToken: string;
    req: reqIter;
} | {
    authToken: string;
    set: any;
} | {
    authToken: string;
    reg: true;
};
export type resp<A> = {
    error: "Invalid auth data";
} | {
    error: "Iter is not exists";
} | {
    error: "Invalid format of request";
} | {
    error: "Unexcepted error";
    details: string;
} | {
    iter: string;
} | {
    id: number;
} | {
    vals: Array<{
        id: number;
        val: any;
    }>;
} | {
    val: {
        id: number;
        val: any;
    } | null;
};
export type NetMessage = {
    getBody: () => body;
    sendResponse: (a: any) => void;
};
export declare class ListNetShell {
    private db;
    private token;
    private filePath;
    private timer;
    private isWriting;
    constructor(db: ListDb<any>, token: string, filepath?: string | null);
    private checkAuth;
    handleMessage: (msg: NetMessage) => void;
}
