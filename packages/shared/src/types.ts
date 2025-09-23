export interface User { id: string; handle: string; email: string; createdAt: string; }
export type ContestStatus = 'DRAFT' | 'OPEN' | 'LOCKED' | 'SETTLED';
export interface Contest { id: string; name: string; status: ContestStatus; startAt: string; endAt: string; scoringRule: string; createdById: string; }
export interface ContestEntry { id: string; contestId: string; userId: string; createdAt: string; finalScore?: number | null; }
export interface EntryPick { id: string; entryId: string; ticker: string; weight: number; lockPrice?: number | null; closePrice?: number | null; }
export interface LeaderboardSnapshot { id: string; contestId: string; snapshotAt: string; ranks: Array<{ entryId: string; score: number; rank: number }>; }
export interface ScoreUpdate { entryId: string; score: number; rank: number; }
