import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        const users = await prisma.user.findMany();
        console.log("Found users:", users.length);
        if (users.length === 0) {
            console.log("No users found. Creating admin user...");
            await prisma.user.create({
                data: {
                    name: "Admin User",
                    email: "admin@staykaro.com",
                    password: "$2a$10$YourHashedPasswordHere", // Placeholder hash
                    isAdmin: true
                }
            })
            console.log("Created admin@staykaro.com");
        } else {
            console.log("Users:", users.map(u => ({ email: u.email, isAdmin: u.isAdmin })));
            const userToPromote = users[0];

            await prisma.user.update({
                where: { id: userToPromote.id },
                data: { isAdmin: true }
            });
            console.log(`Promoted ${userToPromote.email} to admin`);
        }
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
