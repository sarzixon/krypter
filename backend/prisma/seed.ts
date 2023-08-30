import { PrismaClient } from '@prisma/client'
import { log } from 'console';
const prisma = new PrismaClient()

async function main() {

    const admin = await prisma.user.upsert({
        where: { uid: 1 },
        update: {
            email: 'saru@gmail.com',
            password: '5d5bc32dc1cad3d1d5dc6cf1430b431bbec8f60f6b450b4004a4af97f280a10bb4aaadb901cbe1e4f821ad7578482ac4a0b7b96f83d45c455782b90c3bcd1af5',
            active: true,
            role: 'ADMIN',
            salt: '84809de8889477c75234',
            policy: true,
            created_at: new Date(),
        },
        create: {
            email: 'saru@gmail.com',
            password: '5d5bc32dc1cad3d1d5dc6cf1430b431bbec8f60f6b450b4004a4af97f280a10bb4aaadb901cbe1e4f821ad7578482ac4a0b7b96f83d45c455782b90c3bcd1af5',
            active: true,
            role: 'ADMIN',
            salt: '84809de8889477c75234',
            policy: true,
            created_at: new Date(),
        }
    });

    log(admin);

    const btc = await prisma.asset.create({
        data: {
            ownerId: admin.uid,
            name: 'BTC',
            quantity: 1,
            type: 'CRYPTO',
        }
    });

    const eth = await prisma.asset.create({
        data: {
            ownerId: admin.uid,
            name: 'ETH',
            quantity: 10,
            type: 'CRYPTO',
        }
    });

    const bnb = await prisma.asset.create({
        data: {
            ownerId: admin.uid,
            name: 'BNB',
            quantity: 400,
            type: 'CRYPTO',
        }
    });

    log([btc, eth, bnb]);
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