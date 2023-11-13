import { ListDb } from "./ListDb";
import * as listReq from "./ListNewReq";
import * as listResp from "./ListResp";
export type NetMessage = {
    getBody: () => listReq.RegBody;
    sendResponse: (a: listResp.ListResp) => void;
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
