"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboardSnapQueue = exports.settleQueue = exports.lockQueue = exports.prelockQueue = void 0;
const bullmq_1 = require("bullmq");
const env_1 = require("../env");
const connection = env_1.env.REDIS_URL
    ? { connection: { url: env_1.env.REDIS_URL } }
    : null;
function createQueue(name) {
    if (!connection) {
        if (process.env.NODE_ENV !== 'test') {
            console.warn(`[queues] Queue "${name}" disabled – no REDIS_URL configured. Jobs will be ignored.`);
        }
        return null;
    }
    return new bullmq_1.Queue(name, connection);
}
exports.prelockQueue = createQueue('schedule:prelock');
exports.lockQueue = createQueue('contest:lock');
exports.settleQueue = createQueue('contest:settle');
exports.leaderboardSnapQueue = createQueue('snap:leaderboard');
//# sourceMappingURL=index.js.map