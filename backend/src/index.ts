import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
// @ts-ignore
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()




const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Database Connection

async function main () {

    // Routes
    app.get('/', (req, res) => {
        res.send('Welcome to the Crypto Trading Platform API!');
    });

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

