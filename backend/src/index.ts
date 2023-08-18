import 'reflect-metadata';
import express, {Express} from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import {prisma} from "./prisma";

import {AuthRouter} from "./routers/AuthRouter";
import {UserRouter} from "./routers/UserRouter";

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    credentials: true,
    origin: true, //'http://localhost:5137',
    exposedHeaders: ["set-cookie"]
}));
app.use(bodyParser.json());
app.use(cookieParser(process.env.COOKIE_SECRET || '03259f2125d922b4724075d7eab22253'));
app.use(morgan('dev'));

async function main () {

    // Routes
    app.get('/', (req, res) => res.send('basic stuff bro'))
    app.use('/auth', AuthRouter);
    app.use('/user', UserRouter);

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

