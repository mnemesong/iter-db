import { ListDb } from "./ListDb";
import { ListDbMessage } from "./ListDbMessage";
export type ListDbShellConfig = {
    token: string;
    filepath?: string | null;
    fileDelay?: number;
    unref?: boolean;
};
export declare class ListDbShell {
    private db;
    private token;
    private filePath;
    private timer;
    private isWriting;
    private fileWriteDelay;
    private unref;
    constructor(db: ListDb<any>, config?: ListDbShellConfig);
    private checkAuth;
    handleMessage: (msg: ListDbMessage) => void;
}
