import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const deleted = await prisma.links.delete({
        where: { id: Number(event.context.prisma.id) },
    })
    return deleted
})