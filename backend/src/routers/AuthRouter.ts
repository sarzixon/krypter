import { Router } from "express";
import { Login, Logout, Register } from "../api/Auth/auth.controller";

export const AuthRouter = Router();

AuthRouter.use((req, res, next) => {
    console.log('Auth req: ', (new Date).toString())
    next()
})

AuthRouter.post('/login', Login);

AuthRouter.post('/logout', Logout);

AuthRouter.post('/register', Register);


