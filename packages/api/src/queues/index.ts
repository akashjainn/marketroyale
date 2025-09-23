import { Queue } from 'bullmq';
import { env } from '../env';

const connection = { connection: { url: env.REDIS_URL || 'redis://localhost:6379' } };

export const prelockQueue = new Queue('schedule:prelock', connection);
export const lockQueue = new Queue('contest:lock', connection);
export const settleQueue = new Queue('contest:settle', connection);
export const leaderboardSnapQueue = new Queue('snap:leaderboard', connection);
