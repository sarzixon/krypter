import { Request, Response, NextFunction } from 'express';
import { log } from "console";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { prisma } from "../prisma";
import { RefreshToken, User } from "@prisma/client";
import { AuthCookieNames } from "../api/Auth/auth.controller";
import { AuthorizedRequest } from '../types/Common';

function createAuthTokens(user: User) {
    const accessToken = jwt.sign({ id: user.uid, email: user.email, role: user.role }, process.env.JWT_SECRET || 'access_secret', { expiresIn: process.env.JWT_ACCESS_EXIPRES });
    const refreshToken = crypto.randomUUID().toString();

    try {
        updateUserRefreshToken(user, refreshToken);
    } catch (error: unknown) {
        log("AuthGuard: couldn't update RefreshToken or User table: " + error);
    }

    return { accessToken, refreshToken };
}

async function updateUserRefreshToken(user: User, refreshToken: string) {
    await prisma.refreshToken.upsert({
        where: {
            userId: user.uid
        },
        create: {
            userId: user.uid,
            hash: refreshToken,
            created_at: new Date(),
            expires_at: new Date(Date.now() + Number(process.env.JWT_REFRESH_EXIPRES))
        },
        update: {
            hash: refreshToken,
            created_at: new Date(),
            expires_at: new Date(Date.now() + Number(process.env.JWT_REFRESH_EXIPRES))
        }
    });

    await prisma.user.update({
        where: {
            uid: user.uid
        },
        data: {
            last_login: new Date()
        }
    });
}

async function validateRefreshToken(refreshToken: string | undefined): Promise<false | RefreshToken> {

    let entity = refreshToken && await prisma.refreshToken.findFirst({
        where: {
            hash: refreshToken
        }
    });

    if (!entity) {
        return false;
    }
    entity = entity as RefreshToken;

    if (!(new Date(entity.expires_at) > new Date(Date.now()))) {
        return false;
    }

    return entity;
}

function sendUnauthorizedResponseAndClearCookie(res: Response) {
    res.clearCookie(AuthCookieNames.refreshToken, {
        httpOnly: true,
        secure: true,
        signed: true,
    })
        .status(401)
        .json({ message: 'please log in' })
        .end();
}

function addAuthCookiesAndAuthorizedUserToRequest(accessToken: string, refreshToken: string, user: User, req: Request, res: Response) {
    req.signedCookies = {
        [AuthCookieNames.accessToken]: accessToken,
        [AuthCookieNames.refreshToken]: refreshToken,
    };

    const authRequest = req as AuthorizedRequest<any>;

    authRequest.authorizedUser = user;

    res
        .cookie(AuthCookieNames.accessToken, accessToken, {
            httpOnly: true,
            maxAge: Number(process.env.JWT_ACCESS_EXIPRES) || 1000 * 60 * 5,
            secure: true,
            signed: true
        }).cookie(AuthCookieNames.refreshToken, refreshToken, {
            httpOnly: true,
            maxAge: Number(process.env.JWT_REFRESH_EXIPRES) || 1000 * 60 * 60 * 24 * 7,
            secure: true,
            signed: true
        });

}

export async function AuthGuard(req: Request, res: Response, next: NextFunction) {

    const { access_token, refresh_token } = req.signedCookies;
    try {
        const token = jwt.verify(access_token, process.env.JWT_SECRET || 'dd41d289deb71c93') as JwtPayload;

        // @ts-ignore
        if (new Date(token.exp * 1000) < new Date(Date.now())) {
            sendUnauthorizedResponseAndClearCookie(res);
        }

        let user = await prisma.user.findFirst({
            where: {
                uid: token.id
            }
        });

        if (!user) {
            sendUnauthorizedResponseAndClearCookie(res);
        }
        user = user as User;
        const authRequest = req as AuthorizedRequest<any>;

        authRequest.authorizedUser = user;

        console.log('redirecting...')
        next();

    } catch (error) {

        let validRefreshToken = await validateRefreshToken(refresh_token);

        if (!validRefreshToken) {
            sendUnauthorizedResponseAndClearCookie(res);
            return;
        }

        validRefreshToken = validRefreshToken as RefreshToken;

        let user = await prisma.user.findFirst({
            where: {
                uid: validRefreshToken.userId
            }
        });

        if (!user) {
            sendUnauthorizedResponseAndClearCookie(res);
            return;
        }

        user = user as User;

        const { accessToken, refreshToken } = createAuthTokens(user);

        addAuthCookiesAndAuthorizedUserToRequest(accessToken, refreshToken, user, req, res);
    }

}