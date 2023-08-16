import {TypedRequestBody, TypedResponse} from "../../interfaces/Common";


export function handleLogIn(req: TypedRequestBody<{login: string, pwd: string}>, res: TypedResponse<string>) {
    console.log(req.body)
    res.send('kwiii')
}