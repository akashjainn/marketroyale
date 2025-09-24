"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contestsRouter = void 0;
const express_1 = require("express");
const prisma_1 = require("../prisma");
const shared_1 = require("shared");
exports.contestsRouter = (0, express_1.Router)();
// Database availability middleware
function requireDatabase(req, res, next) {
    if (!prisma_1.prisma) {
        return res.status(503).json({ error: 'Database not available' });
    }
    next();
}
// List contests
exports.contestsRouter.get('/', requireDatabase, async (_req, res) => {
    const contests = await prisma_1.prisma.contest.findMany({ orderBy: { startAt: 'desc' }, take: 50 });
    res.json({ contests });
});
// Get single contest
exports.contestsRouter.get('/:id', requireDatabase, async (req, res) => {
    const contest = await prisma_1.prisma.contest.findUnique({ where: { id: req.params.id } });
    if (!contest)
        return res.status(404).json({ error: 'Not found' });
    res.json({ contest });
});
// Create contest (no auth yet; placeholder user id)
exports.contestsRouter.post('/', requireDatabase, async (req, res) => {
    const parsed = shared_1.createContestSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: parsed.error.flatten() });
    const data = parsed.data;
    const contest = await prisma_1.prisma.contest.create({ data: { name: data.name, startAt: data.startAt, endAt: data.endAt, scoringRule: data.scoringRule, createdById: 'demo-user' } });
    res.json({ contest });
});
// Publish (move DRAFT -> OPEN)
exports.contestsRouter.post('/:id/publish', requireDatabase, async (req, res) => {
    const parsed = shared_1.publishContestSchema.safeParse({ contestId: req.params.id });
    if (!parsed.success)
        return res.status(400).json({ error: parsed.error.flatten() });
    const contest = await prisma_1.prisma.contest.update({ where: { id: req.params.id }, data: { status: 'OPEN' } });
    res.json({ contest });
});
// Join contest (creates empty entry)
exports.contestsRouter.post('/:id/join', requireDatabase, async (req, res) => {
    const contest = await prisma_1.prisma.contest.findUnique({ where: { id: req.params.id } });
    if (!contest)
        return res.status(404).json({ error: 'Not found' });
    if (contest.status !== 'OPEN')
        return res.status(400).json({ error: 'Not open' });
    const entry = await prisma_1.prisma.contestEntry.upsert({
        where: { contestId_userId: { contestId: contest.id, userId: 'demo-user' } },
        update: {},
        create: { contestId: contest.id, userId: 'demo-user' }
    });
    res.json({ entry });
});
// Submit picks for entryId
exports.contestsRouter.post('/entries/:entryId/picks', requireDatabase, async (req, res) => {
    const entry = await prisma_1.prisma.contestEntry.findUnique({ where: { id: req.params.entryId }, include: { contest: true } });
    if (!entry)
        return res.status(404).json({ error: 'Entry not found' });
    if (entry.contest.status !== 'OPEN')
        return res.status(400).json({ error: 'Contest not open' });
    const parsed = shared_1.picksSchema.safeParse(req.body?.picks);
    if (!parsed.success)
        return res.status(400).json({ error: parsed.error.flatten() });
    // Replace existing picks
    await prisma_1.prisma.entryPick.deleteMany({ where: { entryId: entry.id } });
    await prisma_1.prisma.entryPick.createMany({ data: parsed.data.map((p) => ({ entryId: entry.id, ticker: p.ticker, weight: p.weight })) });
    res.json({ ok: true });
});
// Leaderboard (latest snapshot or compute quick)
exports.contestsRouter.get('/:id/leaderboard', requireDatabase, async (req, res) => {
    const contestId = req.params.id;
    const latest = await prisma_1.prisma.leaderboard.findFirst({ where: { contestId }, orderBy: { snapshotAt: 'desc' } });
    if (latest)
        return res.json({ leaderboard: latest });
    // fallback compute (scores all zero for now)
    const entries = await prisma_1.prisma.contestEntry.findMany({ where: { contestId } });
    const ranks = entries.map((e, i) => ({ entryId: e.id, score: e.finalScore ?? 0, rank: i + 1 }));
    res.json({ leaderboard: { contestId, ranks } });
});
//# sourceMappingURL=contests.js.map