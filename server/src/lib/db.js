import {PrismaClient} from "@prisma/client"

const globalForPrisma = global
const primsa = new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = primsa;

export default primsa