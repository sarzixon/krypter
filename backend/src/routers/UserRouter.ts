import { Router } from "express";
import { AuthGuard } from "../guards/AuthGuard";
import { GetAuthorizedUser, GetUser, GetUserAssets } from "../api/User/user.controller";
export const UserRouter = Router();

UserRouter.use(AuthGuard);

UserRouter.use((req, res, next) => {
    console.log('User req: ', (new Date).toString())
    next()
})

UserRouter.get('/me', GetAuthorizedUser);

UserRouter.get('/:userId', GetUser);

UserRouter.get('/:userId/assets', GetUserAssets);


