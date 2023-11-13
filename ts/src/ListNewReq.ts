import { Infer, any, literal, number, object, string, union } from "superstruct";

export const regIterStruct = object({
    iter: string(),
    req: union([
        object({ batchNew: number() }),
        object({ oneNew: literal(true) }),
        object({ again: literal(true) })
    ])
})

export type RegIter = Infer<typeof regIterStruct>

export const regBodyStruct = union([
    object({
        authToken: string(),
        req: regIterStruct
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

export type RegBody = Infer<typeof regBodyStruct>