import {Router} from "express";
import {Login, Register} from "../api/LogIn/auth.controller";

export const AuthRouter = Router();

AuthRouter.use((req, res, next) => {
    console.log('Authentication req: ', Date.now())
    next()
})

AuthRouter.post('/login', Login);

AuthRouter.post('/register', Register);


