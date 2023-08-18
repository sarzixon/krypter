import {Router} from "express";

export const UserRouter = Router();

UserRouter.use((req, res, next) => {
    console.log('User req: ', (new Date).toString())
    next()
})

UserRouter.get('/:id/assets',  (req, res) => {
    console.log()

    console.log(req.cookies)
    console.log(req.signedCookies)

    res.send('assety');
});


