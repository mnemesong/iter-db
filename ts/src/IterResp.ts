import { Infer, any, array, literal, nullable, number, object, string, union } from "superstruct";

export const iterRespErrorStruct = object({
    error: union([
        literal("Invalid auth data"),
        literal("Iter is not exists"),
        literal("Invalid format of request"),
        literal("Unexcepted error")
    ]),
    details: union([
        string(),
        literal(undefined)
    ])
})

export type IterRespError = Infer<typeof iterRespErrorStruct>

export const iterRespIterStruct = object({
    iter: string()
})

export type IterRespIter = Infer<typeof iterRespIterStruct>

export const iterRespIdStruct = object({
    id: number()
})

export type IterRespId = Infer<typeof iterRespIdStruct>

export const iterRespValsStruct = object({
    vals: array(object({
        id: number(),
        val: any()
    }))
})

export type IterRespVals = Infer<typeof iterRespValsStruct>

export const iterRespValStruct = object({
    val: nullable(object({
        id: number(),
        val: any()
    }))
})

export type IterRespVal = Infer<typeof iterRespValStruct>

export const iterRespStruct = union([
    iterRespErrorStruct,
    iterRespIterStruct,
    iterRespIdStruct,
    iterRespValsStruct,
    iterRespValStruct,
])

export type IterResp = Infer<typeof iterRespStruct>