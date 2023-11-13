import { IterDb } from "./IterDb";
import { IterDbMessage } from "./IterDbMessage";
export type IterDbShellConfig = {
    token: string;
    filepath?: string | null;
    fileDelay?: number;
    unref?: boolean;
};
export declare class IterDbShell {
    private db;
    private token;
    private filePath;
    private timer;
    private isWriting;
    private fileWriteDelay;
    private unref;
    constructor(db: IterDb<any>, config?: IterDbShellConfig);
    private checkAuth;
    handleMessage: (msg: IterDbMessage) => void;
}
