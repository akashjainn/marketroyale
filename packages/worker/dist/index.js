"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connection = { connection: { url: process.env.REDIS_URL || 'redis://localhost:6379' } };
function makeWorker(name) {
    return new bullmq_1.Worker(name, async (job) => {
        console.log(`[worker:${name}] job ${job.id}`, job.data);
    }, connection);
}
['schedule:prelock', 'contest:lock', 'contest:settle', 'snap:leaderboard'].forEach(makeWorker);
console.log('Worker started');
//# sourceMappingURL=index.js.map