import {Router} from "express";
import {Login, Register} from "../api/Auth/auth.controller";

export const AuthRouter = Router();

AuthRouter.use((req, res, next) => {
    console.log('User req: ', (new Date).toString())
    next()
})

AuthRouter.post('/login', Login);

AuthRouter.post('/register', Register);


