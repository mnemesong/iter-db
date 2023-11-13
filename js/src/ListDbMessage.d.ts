import { ReqBody } from "./ListReq";
import { ListResp } from "./ListResp";
export declare class ListDbMessage {
    private body;
    private resp;
    constructor(body: any);
    getBody: () => ReqBody;
    sendResponse: (a: ListResp) => void;
    getResponse: () => ListResp;
}
