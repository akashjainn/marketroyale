export interface User { id: string; email: string; displayName?: string | null; }
export interface League { id: string; name: string; ownerId: string; }
export interface Contest { id: string; leagueId: string; startsAt: string; endsAt: string; status: string; }
export interface Entry { id: string; userId: string; contestId: string; picks: string[]; score: number; }
export interface ScoreUpdate { entryId: string; score: number; rank: number; }
