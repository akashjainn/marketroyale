"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
// Only load .env file if not in production (Vercel provides env vars directly)
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config();
}
const schema = zod_1.z.object({
    DATABASE_URL: zod_1.z.string().min(1).optional(), // Make DATABASE_URL optional for now
    REDIS_URL: zod_1.z.string().url().optional(),
    FINNHUB_API_KEY: zod_1.z.string().optional(),
    JWT_SECRET: zod_1.z.string().min(10).default('devsecret_dev_only'),
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('development')
});
exports.env = schema.parse(process.env);
//# sourceMappingURL=env.js.map