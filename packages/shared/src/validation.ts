import { z } from 'zod';

export const weightConstraint = {
	minPicks: 5,
	maxPicks: 10,
	maxSingleWeight: 0.4, // 40%
	totalWeight: 1.0
};

export const pickItemSchema = z.object({
	ticker: z.string().regex(/^[A-Z.]{1,10}$/),
	weight: z.number().positive().max(weightConstraint.maxSingleWeight)
});

export const picksSchema = z.array(pickItemSchema)
	.min(weightConstraint.minPicks)
	.max(weightConstraint.maxPicks)
	.refine(arr => Math.abs(arr.reduce((s,p)=>s+p.weight,0) - weightConstraint.totalWeight) < 1e-6, 'Total weight must equal 1.0');

export const createContestSchema = z.object({
	name: z.string().min(3),
	startAt: z.coerce.date(),
	endAt: z.coerce.date(),
	scoringRule: z.string().default('PCT_RETURN')
}).refine(d => d.endAt > d.startAt, 'endAt must be after startAt');

export const joinContestSchema = z.object({ contestId: z.string().cuid() });
export const publishContestSchema = z.object({ contestId: z.string().cuid() });
