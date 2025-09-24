import { Queue } from 'bullmq';
import { env } from '../env';

const connection = env.REDIS_URL
  ? { connection: { url: env.REDIS_URL } }
  : null;

function createQueue(name: string): Queue | null {
  if (!connection) {
    if (process.env.NODE_ENV !== 'test') {
      console.warn(
        `[queues] Queue "${name}" disabled – no REDIS_URL configured. Jobs will be ignored.`
      );
    }
    return null;
  }

  return new Queue(name, connection);
}

export const prelockQueue = createQueue('schedule:prelock');
export const lockQueue = createQueue('contest:lock');
export const settleQueue = createQueue('contest:settle');
export const leaderboardSnapQueue = createQueue('snap:leaderboard');
