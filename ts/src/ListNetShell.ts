import { ListDb } from "./ListDb"

export type reqIter = {
    iter: string,
    req: { batchNew: number } | { oneNew: true } | { again: true }
}

export type body = {
    authToken: string,
    req: reqIter,
} | {
    authToken: string,
    set: any
} | {
    authToken: string,
    reg: true
}

export type resp<A> = {
    error: "Invalid auth data"
} | {
    error: "Iter is not exists"
} | {
    error: "Invalid format of request"
} | {
    error: "Unexcepted error"
    details: string
} | {
    iter: string
} | {
    id: number
} | {
    vals: Array<{
        id: number
        val: any
    }>
} | {
    val: {
        id: number
        val: any
    } | null
}

export type NetMessage = {
    getBody: () => body
    sendResponse: (a: any) => void
}

export class ListNetShell {
    private db: ListDb<any>
    private token: string

    public constructor(db: ListDb<any>, token: string) {
        this.db = db
        this.token = token
    }

    private checkAuth = (token: string): boolean => token === this.token

    public handleMessage = (msg: NetMessage): void => {
        try {
            const body = msg.getBody()
            if (!this.checkAuth(body.authToken)) {
                msg.sendResponse({ error: "Invalid auth data" })
                return
            }
            if (body["req"]) {
                const req: reqIter = body["req"]
                if ((!req.req) || (!req.iter)) {
                    msg.sendResponse({ error: "Invalid format of request" })
                    return
                }
                const iter = this.db.getIter(req.iter)
                if (!iter) {
                    msg.sendResponse({ error: "Iter is not exists" })
                    return
                }
                const reqKeys = Object.keys(req)
                if (reqKeys.includes("batchNew") && (typeof req["batchNew"] === "number")) {
                    let result: { id: number, val: any }[] = []
                    for (let i = 0; i < req["batchNew"]; i++) {
                        if (iter.isFinish()) continue
                        if (iter.isReaded()) {
                            iter.next()
                            if (iter.isFinish()) continue
                            result.push({ id: iter.num(), val: iter.read() })
                        } else {
                            result.push({ id: iter.num(), val: iter.read() })
                        }
                    }
                    msg.sendResponse({ vals: result })
                    return
                }
                if (reqKeys.includes("oneNew")) {
                    if (iter.isFinish()) {
                        msg.sendResponse({ val: null })
                        return
                    }
                    if (iter.isReaded()) {
                        iter.next()
                        if (iter.isFinish()) {
                            msg.sendResponse({ val: null })
                            return
                        }
                        msg.sendResponse({ val: { id: iter.num(), val: iter.read() } })
                        return
                    }
                }
                if (reqKeys.includes("again")) {
                    if (iter.isFinish()) {
                        msg.sendResponse({ val: null })
                        return
                    }
                    msg.sendResponse({ val: { id: iter.num(), val: iter.read() } })
                    return
                }
                msg.sendResponse({ error: "Invalid format of request" })
                return
            }
            if (body["set"]) {
                msg.sendResponse({ id: this.db.push(body["set"]) })
                return
            }
            if (body["reg"]) {
                msg.sendResponse({ iter: this.db.regIter() })
                return
            }
            msg.sendResponse({ error: "Invalid format of request" })
            return
        } catch (e) {
            msg.sendResponse({
                error: "Unexcepted error",
                details: JSON.stringify(e)
            })
        }
    }
}