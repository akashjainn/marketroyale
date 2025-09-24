import { Worker } from 'bullmq';
import dotenv from 'dotenv';

dotenv.config();

const connection = { connection: { url: process.env.REDIS_URL || 'redis://localhost:6379' } };

function makeWorker(name: string) {
  return new Worker(name, async job => {
    console.log(`[worker:${name}] job ${job.id}`, job.data);
  }, connection);
}

['schedule:prelock', 'contest:lock', 'contest:settle', 'snap:leaderboard'].forEach(makeWorker);

console.log('Worker started');
