import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const users = await prisma.user.findMany();
        console.log(`Found ${users.length} users.`);

        const updated = await prisma.user.updateMany({
            data: { isAdmin: true },
        });

        console.log(`Updated ${updated.count} users to be admins.`);

        const allAdmins = await prisma.user.findMany({
            where: { isAdmin: true },
            select: { email: true, isAdmin: true }
        });
        console.log('Current Admins:', allAdmins);

    } catch (e) {
        console.error('Error updating users:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
