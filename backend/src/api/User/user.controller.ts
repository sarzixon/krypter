import { Asset, UserRole } from "@prisma/client";
import { AuthorizedRequest, UserRequestParams } from "../../types/Common";
import { Request, Response } from "express";
import { prisma } from "../../prisma";

export async function GetAuthorizedUser(req: AuthorizedRequest<any>, res: Response) {

    const userData = {
        email: req.authorizedUser?.email,
        active: req.authorizedUser?.active,
        role: req.authorizedUser?.role
    }

    res.json(userData);
}

export async function GetUser(req: AuthorizedRequest<UserRequestParams>, res: Response) {
    let { authorizedUser, params: { userId } } = req;

    if (authorizedUser?.role !== UserRole.ADMIN || Number(userId) !== authorizedUser?.uid) {
        res.sendStatus(401);
        return;
    }

    const requestedUser = await prisma.user.findFirst({
        where: {
            uid: Number(userId)
        }
    });

    res.status(200).json(requestedUser);
}

export async function GetUserAssets(req: AuthorizedRequest<UserRequestParams>, res: Response) {
    let { authorizedUser, params: { userId } } = req;


    if (!(authorizedUser?.role === UserRole.ADMIN || Number(userId) === authorizedUser?.uid)) {
        res.sendStatus(401);
        return;
    }

    const assets: Asset[] = await prisma.asset.findMany({
        where: {
            ownerId: Number(userId)
        }
    })

    res.status(200).json(assets);
    return;
}