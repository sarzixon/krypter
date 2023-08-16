import {Request, Response} from "express";

export function Login(req: Request, res: Response) {
    //validate request data
    console.log(req.body)
    res.send('works')
}
export function Register(req: Request, res: Response) {
    //validate request data

    //check if user with that email address already exists

    //create account

}