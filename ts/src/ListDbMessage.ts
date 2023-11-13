import { ReqBody, reqBodyStruct } from "./ListReq";
import { ListResp, listRespStruct } from "./ListResp";

export class ListDbMessage {
    private body: ReqBody | null
    private resp: ListResp | null = null

    constructor(body: any) {
        if (!reqBodyStruct.is(body)) {
            this.body = null
            this.resp = {
                error: "Invalid format of request"
            }
        }
        this.body = body
    }

    public getBody = (): ReqBody => this.body

    sendResponse = (a: ListResp): void => {
        if (!listRespStruct.is(a)) {
            this.resp = {
                error: "Unexcepted error",
                details: "Invalid format of response: " + JSON.stringify(a)
            }
            return
        }
        this.resp = a
    }

    getResponse = (): ListResp => {
        if (this.resp === null) {
            throw new Error("No response")
        }
        return this.resp
    }
}