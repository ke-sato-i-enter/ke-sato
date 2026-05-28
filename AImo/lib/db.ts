import { PrismaLibSql } from "@prisma/adapter-libsql"
import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
  const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL || "file:./prisma/dev.db",
  })

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma
