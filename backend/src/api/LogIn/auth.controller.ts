import {Request, Response} from "express";
import {PasswordConf} from "../../interfaces/Common";
import {prisma} from "../../prisma";

export function Login(req: Request, res: Response) {
    //validate request data
    console.log(req.body)
    res.send('works')
}

interface RegisterRequest {
    email: string,
    password: string,
    policy: boolean
}
export async function Register(req: Request<RegisterRequest>, res: Response) {
    console.log(req.body)

    //validate request data
    if (req.body.email && req.body.email.length > 0 &&
        req.body.password && req.body.password.length >= PasswordConf.MIN_LENGTH &&
        req.body.policy
    ) {
        const { email, password, policy } = req.body;

        const exists = prisma.user.findUnique({where: {
            email: email
            }})

        if (exists == null) {

            try {
                const newUser = await prisma.user.create({
                    data: {
                        email,
                        password,
                        policy,
                        created_at: new Date(),
                        last_login: new Date()
                    }
                });

                console.log(newUser);
                res.status(201).json(newUser);
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