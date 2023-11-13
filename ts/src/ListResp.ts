import { Infer, any, array, literal, nullable, number, object, string, union } from "superstruct";

export const listRespErrorStruct = object({
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

export type ListRespError = Infer<typeof listRespErrorStruct>

export const listRespIterStruct = object({
    iter: string()
})

export type ListRespIter = Infer<typeof listRespIterStruct>

export const listRespIdStruct = object({
    id: number()
})

export type ListRespId = Infer<typeof listRespIdStruct>

export const listRespValsStruct = object({
    vals: array(object({
        id: number(),
        val: any()
    }))
})

export type ListRespVals = Infer<typeof listRespValsStruct>

export const listRespValStruct = object({
    val: nullable(object({
        id: number(),
        val: any()
    }))
})

export type ListRespVal = Infer<typeof listRespValStruct>

export const listRespStruct = union([
    listRespErrorStruct,
    listRespIterStruct,
    listRespIdStruct,
    listRespValsStruct,
    listRespValStruct,
])

export type ListResp = Infer<typeof listRespStruct>