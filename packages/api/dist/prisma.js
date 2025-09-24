"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const env_1 = require("./env");
const globalForPrisma = global;
// Only create Prisma client if DATABASE_URL is available
function createPrismaClient() {
    if (!env_1.env.DATABASE_URL) {
        console.warn('DATABASE_URL not found, Prisma client will not be available');
        return null;
    }
    return new client_1.PrismaClient();
}
exports.prisma = globalForPrisma.prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== 'production' && exports.prisma) {
    globalForPrisma.prisma = exports.prisma;
}
//# sourceMappingURL=prisma.js.map