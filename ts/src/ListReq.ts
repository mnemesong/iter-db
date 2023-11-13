import { Infer, any, literal, number, object, string, union } from "superstruct";

export const reqIterStruct = object({
    iter: string(),
    req: union([
        object({ batchNew: number() }),
        object({ oneNew: literal(true) }),
        object({ again: literal(true) })
    ])
})

export type ReqIter = Infer<typeof reqIterStruct>

export const reqBodyStruct = union([
    object({
        authToken: string(),
        req: reqIterStruct
    }),
    object({
        authToken: string(),
        set: any()
    }),
    object({
        authToken: string(),
        reg: literal(true)
    })
])

export type ReqBody = Infer<typeof reqBodyStruct>