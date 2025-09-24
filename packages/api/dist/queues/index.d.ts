import { Queue } from 'bullmq';
export declare const prelockQueue: Queue<any, any, string, any, any, string> | null;
export declare const lockQueue: Queue<any, any, string, any, any, string> | null;
export declare const settleQueue: Queue<any, any, string, any, any, string> | null;
export declare const leaderboardSnapQueue: Queue<any, any, string, any, any, string> | null;
