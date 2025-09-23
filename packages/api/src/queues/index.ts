import { Queue } from 'bullmq';
import { env } from '../env';

const connection = { connection: { url: env.REDIS_URL || 'redis://localhost:6379' } };

export const quotesQueue = new Queue('quotes', connection);
export const contestOpenQueue = new Queue('contest:open', connection);
export const contestTickQueue = new Queue('contest:tick', connection);
export const contestSettleQueue = new Queue('contest:settle', connection);
