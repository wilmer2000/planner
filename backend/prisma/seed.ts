import {PrismaClient} from '@prisma/client';
import {withAccelerate} from '@prisma/extension-accelerate';
import * as bcrypt from 'bcrypt';


const prisma = new PrismaClient().$extends(withAccelerate());

const userData: any[] = [
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
        const data = {
            email: u.email,
            role: u.role,
            hashedPassword: await bcrypt.hash(u.password, 10)
        }
        const user = await prisma.user.create({data});
        console.log(`Created user ${user.name} with id: ${user.id}`);
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
