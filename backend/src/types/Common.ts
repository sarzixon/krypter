import { User } from "@prisma/client";
import { Send } from "express-serve-static-core";
import { Request } from "express";

export interface TypedRequestBody<T> extends Express.Request {
    body: T
}
export interface TypedResponse<ResBody> extends Express.Response {
    json: Send<ResBody, this>;
    send: Send<ResBody, this>;
    status: Send<Number, this>;
}

export type AuthorizedRequest = {
    authorizedUser?: User
} & Request;

export enum PasswordConf {
    MIN_LENGTH = 8,
}