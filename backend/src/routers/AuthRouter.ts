import {Router} from "express";
import {Login} from "../api/LogIn/auth.controller";

export const AuthRouter = Router();

// middleware that is specific to this router
AuthRouter.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})
// define the home page route
AuthRouter.get('/', (req, res) => {
    res.send('Birds home page')
})
// define the about route
AuthRouter.post('/login', Login);


