import { log } from "console";
import { Response, Router } from "express";
import { AuthGuard } from "../guards/AuthGuard";
import { AuthorizedRequest } from "../types/Common";
export const UserRouter = Router();

UserRouter.use(AuthGuard);

UserRouter.use((req, res, next) => {
    console.log('User req: ', (new Date).toString())
    next()
})



UserRouter.get('/me', async (req: AuthorizedRequest, res: Response) => {

    log(req.authorizedUser)

    const userData = {
        email: req.authorizedUser?.email,
        active: req.authorizedUser?.active,
        role: req.authorizedUser?.role
    }

    res.json(userData);
});


