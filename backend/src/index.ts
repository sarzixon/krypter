import 'reflect-metadata';
import { prisma } from "./prisma";
import app from './app';

const PORT = process.env.PORT || 3000;

async function main() {
    // Start the server
    app.listen(3002, () => {
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

