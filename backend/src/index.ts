import 'reflect-metadata';
import express, {Express} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
// @ts-ignore
import { PrismaClient } from '@prisma/client';
import {AuthRouter} from "./routers/AuthRouter";

const prisma = new PrismaClient()

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));


async function main () {

    // Routes
    app.get('/', (req, res) => res.send('basic stuff bro'))
    app.use('/auth', AuthRouter);

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

