"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboardSnapQueue = exports.settleQueue = exports.lockQueue = exports.prelockQueue = void 0;
const bullmq_1 = require("bullmq");
const env_1 = require("../env");
const connection = { connection: { url: env_1.env.REDIS_URL || 'redis://localhost:6379' } };
exports.prelockQueue = new bullmq_1.Queue('schedule:prelock', connection);
exports.lockQueue = new bullmq_1.Queue('contest:lock', connection);
exports.settleQueue = new bullmq_1.Queue('contest:settle', connection);
exports.leaderboardSnapQueue = new bullmq_1.Queue('snap:leaderboard', connection);
//# sourceMappingURL=index.js.map