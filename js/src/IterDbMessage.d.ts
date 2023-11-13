import { ReqIterBody } from "./IterReq";
import { IterResp } from "./IterResp";
export declare class IterDbMessage {
    private body;
    private resp;
    constructor(body: any);
    getBody: () => ReqIterBody;
    sendResponse: (a: IterResp) => void;
    getResponse: () => IterResp;
}
