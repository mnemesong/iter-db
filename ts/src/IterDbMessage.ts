import { ReqIterBody, reqIterBodyStruct } from "./IterReq";
import { IterResp, iterRespStruct } from "./IterResp";

export class IterDbMessage {
    private body: ReqIterBody | null
    private resp: IterResp | null = null

    constructor(body: any) {
        if (!reqIterBodyStruct.is(body)) {
            this.body = null
            this.resp = {
                error: "Invalid format of request"
            }
        }
        this.body = body
    }

    public getBody = (): ReqIterBody => this.body

    sendResponse = (a: IterResp): void => {
        if (!iterRespStruct.is(a)) {
            this.resp = {
                error: "Unexcepted error",
                details: "Invalid format of response: " + JSON.stringify(a)
            }
            return
        }
        this.resp = a
    }

    getResponse = (): IterResp => {
        if (this.resp === null) {
            throw new Error("No response")
        }
        return this.resp
    }
}