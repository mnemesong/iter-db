import { Infer } from "superstruct";
export declare const listRespErrorStruct: import("superstruct").Struct<{
    error: "Invalid auth data" | "Iter is not exists" | "Invalid format of request" | "Unexcepted error";
    details?: any;
}, {
    error: import("superstruct").Struct<"Invalid auth data" | "Iter is not exists" | "Invalid format of request" | "Unexcepted error", null>;
    details: import("superstruct").Struct<any, null>;
}>;
export type ListRespError = Infer<typeof listRespErrorStruct>;
export declare const listRespIterStruct: import("superstruct").Struct<{
    iter: string;
}, {
    iter: import("superstruct").Struct<string, null>;
}>;
export type ListRespIter = Infer<typeof listRespIterStruct>;
export declare const listRespIdStruct: import("superstruct").Struct<{
    id: number;
}, {
    id: import("superstruct").Struct<number, null>;
}>;
export type ListRespId = Infer<typeof listRespIdStruct>;
export declare const listRespValsStruct: import("superstruct").Struct<{
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
export type ListRespVals = Infer<typeof listRespValsStruct>;
export declare const listRespValStruct: import("superstruct").Struct<{
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
export type ListRespVal = Infer<typeof listRespValStruct>;
export declare const listRespStruct: import("superstruct").Struct<{
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
export type ListResp = Infer<typeof listRespStruct>;
