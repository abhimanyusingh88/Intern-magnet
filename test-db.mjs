import pkg from "@prisma/client"
const { PrismaClient } = pkg

const prisma = new PrismaClient()

async function main() {
    const r = await prisma.user.create({
        data: {
            email: "hello@prisma-test.com",
            name: "Prisma Test User",
        },
    })

    console.log("Inserted:", r)
}

main()
    .catch((e) => {
        console.error("Error:", e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
