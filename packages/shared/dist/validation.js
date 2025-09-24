"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishContestSchema = exports.joinContestSchema = exports.createContestSchema = exports.picksSchema = exports.pickItemSchema = exports.weightConstraint = void 0;
const zod_1 = require("zod");
exports.weightConstraint = {
    minPicks: 5,
    maxPicks: 10,
    maxSingleWeight: 0.4, // 40%
    totalWeight: 1.0
};
exports.pickItemSchema = zod_1.z.object({
    ticker: zod_1.z.string().regex(/^[A-Z.]{1,10}$/),
    weight: zod_1.z.number().positive().max(exports.weightConstraint.maxSingleWeight)
});
exports.picksSchema = zod_1.z.array(exports.pickItemSchema)
    .min(exports.weightConstraint.minPicks)
    .max(exports.weightConstraint.maxPicks)
    .refine(arr => Math.abs(arr.reduce((s, p) => s + p.weight, 0) - exports.weightConstraint.totalWeight) < 1e-6, 'Total weight must equal 1.0');
exports.createContestSchema = zod_1.z.object({
    name: zod_1.z.string().min(3),
    startAt: zod_1.z.coerce.date(),
    endAt: zod_1.z.coerce.date(),
    scoringRule: zod_1.z.string().default('PCT_RETURN')
}).refine(d => d.endAt > d.startAt, 'endAt must be after startAt');
exports.joinContestSchema = zod_1.z.object({ contestId: zod_1.z.string().cuid() });
exports.publishContestSchema = zod_1.z.object({ contestId: zod_1.z.string().cuid() });
//# sourceMappingURL=validation.js.map