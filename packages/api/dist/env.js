"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Enhanced env loading: try local package .env, then repo root .env (two levels up)
if (process.env.NODE_ENV !== 'production') {
    const tried = [];
    function tryLoad(p) {
        tried.push(p);
        if (fs_1.default.existsSync(p)) {
            dotenv_1.default.config({ path: p });
            return true;
        }
        return false;
    }
    const localEnv = path_1.default.resolve(process.cwd(), '.env');
    const rootEnv = path_1.default.resolve(process.cwd(), '../../.env');
    if (!tryLoad(localEnv)) {
        tryLoad(rootEnv);
    }
    if (!process.env.DATABASE_URL) {
        console.warn('ENV: DATABASE_URL not set. Tried:', tried.join(', '));
    }
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