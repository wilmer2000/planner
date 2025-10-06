import {PrismaClient, Prisma} from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';


const prisma = new PrismaClient().$extends(withAccelerate());

const userData: Prisma.UserCreateInput[] = [
    {
        email: 'admin@admin.com',
        password: 'password',
        role: 'ADMIN'
    }
];

async function main() {
    console.log(`Start seeding ...`);

    const hasUsers = await prisma.user.count();
    if (hasUsers > 0) {
        console.log(`Users already exist. Skipping seeding.`);
        return;
    }

    for (const u of userData) {
        const user = await prisma.user.create({ data: u });
        console.log(`Created user ${user.name } with id: ${user.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
