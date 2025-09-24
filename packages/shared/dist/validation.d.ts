import { z } from 'zod';
export declare const weightConstraint: {
    minPicks: number;
    maxPicks: number;
    maxSingleWeight: number;
    totalWeight: number;
};
export declare const pickItemSchema: z.ZodObject<{
    ticker: z.ZodString;
    weight: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    ticker: string;
    weight: number;
}, {
    ticker: string;
    weight: number;
}>;
export declare const picksSchema: z.ZodEffects<z.ZodArray<z.ZodObject<{
    ticker: z.ZodString;
    weight: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    ticker: string;
    weight: number;
}, {
    ticker: string;
    weight: number;
}>, "many">, {
    ticker: string;
    weight: number;
}[], {
    ticker: string;
    weight: number;
}[]>;
export declare const createContestSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    startAt: z.ZodDate;
    endAt: z.ZodDate;
    scoringRule: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
    startAt: Date;
    endAt: Date;
    scoringRule: string;
}, {
    name: string;
    startAt: Date;
    endAt: Date;
    scoringRule?: string | undefined;
}>, {
    name: string;
    startAt: Date;
    endAt: Date;
    scoringRule: string;
}, {
    name: string;
    startAt: Date;
    endAt: Date;
    scoringRule?: string | undefined;
}>;
export declare const joinContestSchema: z.ZodObject<{
    contestId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    contestId: string;
}, {
    contestId: string;
}>;
export declare const publishContestSchema: z.ZodObject<{
    contestId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    contestId: string;
}, {
    contestId: string;
}>;
//# sourceMappingURL=validation.d.ts.map