import { Send } from "express-serve-static-core";

export interface TypedRequestBody<T> extends Express.Request {
    body: T
}
export interface TypedResponse<ResBody> extends Express.Response {
    json: Send<ResBody, this>;
    send: Send<ResBody,this>;
    status: Send<Number, this>;
}