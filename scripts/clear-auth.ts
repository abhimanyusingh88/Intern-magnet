
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Clearing Better Auth tables...");

    // Delete in order to respect foreign keys (cascades should handle it but being safe)
    // AuthUser is the root for auth tables
    try {
        await prisma.authUser.deleteMany({});
        console.log("Successfully deleted all AuthUsers.");
    } catch (e) {
        console.error("Error deleting AuthUsers:", e);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
