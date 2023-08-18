import {Request, Response} from "express";
import {PasswordConf} from "../../interfaces/Common";
import {prisma} from "../../prisma";
import {User} from "@prisma/client";
import * as crypto from "crypto";
import jwt from "jsonwebtoken"


interface LoginRequest {
    email: string,
    password: string
}
export async function Login(req: Request<LoginRequest>, res: Response) {
    //validate request data
    const { email, password } = req.body;

    //find user by mail
    const user: User | null = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (!user) {
        res.status(400).json({message: 'Could not find user with mail: ' + email});
        return;
    }

    const hashedInput = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');

    if (hashedInput !== user.password) {
        res.status(400).json({message: 'Invalid password'});
        return;
    }

    //create jsonwebtoken
    const accessToken = jwt.sign({ id: user.uid, email }, process.env.JWT_SECRET || 'access_secret', {expiresIn: process.env.JWT_ACCESS_EXIPRES});
    const refreshToken = crypto.randomUUID().toString();

    await prisma.refreshToken.upsert({
        where: {
            userId: user.uid
        },
        create: {
                userId: user.uid,
                hash: refreshToken,
                created_at: new Date(),
                expires_at: new Date(Date.now() + Number(process.env.JWT_REFRESH_EXIPRES) )
            },
        update: {
                hash: refreshToken,
                created_at: new Date(),
                expires_at: new Date(Date.now() + Number(process.env.JWT_REFRESH_EXIPRES) )
        }

    })

    res.status(200)
        .cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: Number(process.env.JWT_ACCESS_EXIPRES) || 1000 * 60 * 60 * 24,
            secure: true,
        signed: true
    }).cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: Number(process.env.JWT_REFRESH_EXIPRES) || 1000 * 60 * 60 * 24 * 7,
        secure: true,
        signed: true
    }).send('logged in!').end()
}

interface RegisterRequest {
    email: string,
    password: string,
    policy: boolean
}
export async function Register(req: Request<RegisterRequest>, res: Response) {

    //validate request data
    if (req.body.email && req.body.email.length > 0 &&
        req.body.password && req.body.password.length >= PasswordConf.MIN_LENGTH &&
        req.body.policy
    ) {
        const { email, password, policy } = req.body;

        const exists = await prisma.user.findUnique({where: {
            email: email
            }})

        if (exists == null) {

            try {
                const salt = crypto.randomBytes(10).toString('hex');
                const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

                await prisma.user.create({
                    data: {
                        email,
                        password: hash,
                        salt,
                        policy,
                        created_at: new Date(),
                    }
                });

                res.status(201).json({message: "success"});
                return;

            } catch (e) {
                //@ts-ignore
                res.status(500).json({message: "error while creating new user. Please try again later."});
                return;
            }

        }

        res.status(400).json({message: "User already exists. Please Log in."});
        return;

    }

    res.status(400).json({message: "invalid request data"});
}