import { Infer } from "superstruct";
export declare const reqIterStruct: import("superstruct").Struct<{
    iter: string;
    req: {
        batchNew: number;
    } | {
        oneNew: true;
    } | {
        again: true;
    };
}, {
    iter: import("superstruct").Struct<string, null>;
    req: import("superstruct").Struct<{
        batchNew: number;
    } | {
        oneNew: true;
    } | {
        again: true;
    }, null>;
}>;
export type ReqIter = Infer<typeof reqIterStruct>;
export declare const reqIterBodyStruct: import("superstruct").Struct<{
    req: {
        iter: string;
        req: {
            batchNew: number;
        } | {
            oneNew: true;
        } | {
            again: true;
        };
    };
    authToken: string;
} | {
    authToken: string;
    set?: any;
} | {
    authToken: string;
    reg: true;
}, null>;
export type ReqIterBody = Infer<typeof reqIterBodyStruct>;
