import { Infer } from "superstruct";
export declare const iterRespErrorStruct: import("superstruct").Struct<{
    error: "Invalid auth data" | "Iter is not exists" | "Invalid format of request" | "Unexcepted error";
    details?: any;
}, {
    error: import("superstruct").Struct<"Invalid auth data" | "Iter is not exists" | "Invalid format of request" | "Unexcepted error", null>;
    details: import("superstruct").Struct<any, null>;
}>;
export type IterRespError = Infer<typeof iterRespErrorStruct>;
export declare const iterRespIterStruct: import("superstruct").Struct<{
    iter: string;
}, {
    iter: import("superstruct").Struct<string, null>;
}>;
export type IterRespIter = Infer<typeof iterRespIterStruct>;
export declare const iterRespIdStruct: import("superstruct").Struct<{
    id: number;
}, {
    id: import("superstruct").Struct<number, null>;
}>;
export type IterRespId = Infer<typeof iterRespIdStruct>;
export declare const iterRespValsStruct: import("superstruct").Struct<{
    vals: {
        id: number;
        val?: any;
    }[];
}, {
    vals: import("superstruct").Struct<{
        id: number;
        val?: any;
    }[], import("superstruct").Struct<{
        id: number;
        val?: any;
    }, {
        id: import("superstruct").Struct<number, null>;
        val: import("superstruct").Struct<any, null>;
    }>>;
}>;
export type IterRespVals = Infer<typeof iterRespValsStruct>;
export declare const iterRespValStruct: import("superstruct").Struct<{
    val: {
        id: number;
        val?: any;
    };
}, {
    val: import("superstruct").Struct<{
        id: number;
        val?: any;
    }, {
        id: import("superstruct").Struct<number, null>;
        val: import("superstruct").Struct<any, null>;
    }>;
}>;
export type IterRespVal = Infer<typeof iterRespValStruct>;
export declare const iterRespStruct: import("superstruct").Struct<{
    error: "Invalid auth data" | "Iter is not exists" | "Invalid format of request" | "Unexcepted error";
    details?: any;
} | {
    iter: string;
} | {
    id: number;
} | {
    vals: {
        id: number;
        val?: any;
    }[];
} | {
    val: {
        id: number;
        val?: any;
    };
}, null>;
export type IterResp = Infer<typeof iterRespStruct>;
