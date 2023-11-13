import { ListDb } from "./ListDb"
import * as fs from "fs"
import * as listReq from "./ListReq"
import { ListDbMessage } from "./ListDbMessage"

export type ListDbShellConfig = {
    token: string,
    filepath?: string | null,
    fileDelay?: number
    unref?: boolean
}

export class ListDbShell {
    private db: ListDb<any>
    private token: string
    private filePath: string | null
    private timer: NodeJS.Timeout | null = null
    private isWriting: boolean = false
    private fileWriteDelay: number
    private unref: boolean

    public constructor(
        db: ListDb<any>,
        config?: ListDbShellConfig
    ) {
        this.db = db
        this.token = config.token
        this.filePath = (!!config && config.filepath) ? config.filepath : null
        this.fileWriteDelay = (!!config && config.fileDelay) ? config.fileDelay : 3000
        this.unref = (!!config && config.unref) ? config.unref : false
        if (this.filePath) {
            if (!fs.existsSync(this.filePath)) {
                fs.writeFileSync(this.filePath, "[]")
            }
            const data = fs.readFileSync(this.filePath).toString()
            db.parseFromJson(data)
            this.timer = setInterval(() => {
                if (!this.isWriting) {
                    this.isWriting = true;
                    fs.writeFileSync(this.filePath, db.serializeToJson())
                    this.isWriting = false;
                }
            }, this.fileWriteDelay)
            if (this.unref) {
                this.timer.unref()
            }
        }
    }

    private checkAuth = (token: string): boolean => token === this.token

    public handleMessage = (msg: ListDbMessage): void => {
        try {
            const body = msg.getBody()
            if (!body) {
                msg.sendResponse({
                    error: "Invalid format of request"
                })
            }
            if (!this.checkAuth(body.authToken)) {
                msg.sendResponse({ error: "Invalid auth data" })
                return
            }
            if (body["req"]) {
                const req: listReq.ReqIter = body["req"]
                if ((!req.req) || (!req.iter)) {
                    msg.sendResponse({ error: "Invalid format of request" })
                    return
                }
                const iter = this.db.getIter(req.iter)
                if (!iter) {
                    msg.sendResponse({ error: "Iter is not exists" })
                    return
                }
                const reqKeys = Object.keys(req.req)
                if (reqKeys.includes("batchNew") && (typeof req.req["batchNew"] === "number")) {
                    let result: { id: number, val: any }[] = []
                    for (let i = 0; i < req.req["batchNew"]; i++) {
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
                    if (iter.isReaded()) {
                        iter.next()
                    }
                    if (iter.isFinish()) {
                        msg.sendResponse({ val: null })
                        return
                    }
                    msg.sendResponse({ val: { id: iter.num(), val: iter.read() } })
                    return
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