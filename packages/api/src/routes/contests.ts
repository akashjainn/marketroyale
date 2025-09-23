import { Router, Router as ExpressRouter } from 'express';
import { prisma } from '../prisma';
import { createContestSchema, publishContestSchema, picksSchema } from 'shared';

export const contestsRouter: ExpressRouter = Router();

// List contests
contestsRouter.get('/', async (_req, res) => {
  const contests = await prisma.contest.findMany({ orderBy: { startAt: 'desc' as const }, take: 50 });
  res.json({ contests });
});

// Get single contest
contestsRouter.get('/:id', async (req, res) => {
  const contest = await prisma.contest.findUnique({ where: { id: req.params.id } });
  if (!contest) return res.status(404).json({ error: 'Not found' });
  res.json({ contest });
});

// Create contest (no auth yet; placeholder user id)
contestsRouter.post('/', async (req, res) => {
  const parsed = createContestSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const data = parsed.data;
  const contest = await prisma.contest.create({ data: { name: data.name, startAt: data.startAt, endAt: data.endAt, scoringRule: data.scoringRule, createdById: 'demo-user' } });
  res.json({ contest });
});

// Publish (move DRAFT -> OPEN)
contestsRouter.post('/:id/publish', async (req, res) => {
  const parsed = publishContestSchema.safeParse({ contestId: req.params.id });
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const contest = await prisma.contest.update({ where: { id: req.params.id }, data: { status: 'OPEN' } });
  res.json({ contest });
});

// Join contest (creates empty entry)
contestsRouter.post('/:id/join', async (req, res) => {
  const contest = await prisma.contest.findUnique({ where: { id: req.params.id } });
  if (!contest) return res.status(404).json({ error: 'Not found' });
  if (contest.status !== 'OPEN') return res.status(400).json({ error: 'Not open' });
  const entry = await prisma.contestEntry.upsert({
    where: { contestId_userId: { contestId: contest.id, userId: 'demo-user' } },
    update: {},
    create: { contestId: contest.id, userId: 'demo-user' }
  });
  res.json({ entry });
});

// Submit picks for entryId
contestsRouter.post('/entries/:entryId/picks', async (req, res) => {
  const entry = await prisma.contestEntry.findUnique({ where: { id: req.params.entryId }, include: { contest: true } });
  if (!entry) return res.status(404).json({ error: 'Entry not found' });
  if (entry.contest.status !== 'OPEN') return res.status(400).json({ error: 'Contest not open' });
  const parsed = picksSchema.safeParse(req.body?.picks);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  // Replace existing picks
  await prisma.entryPick.deleteMany({ where: { entryId: entry.id } });
  await prisma.entryPick.createMany({ data: parsed.data.map((p: { ticker: string; weight: number }) => ({ entryId: entry.id, ticker: p.ticker, weight: p.weight })) });
  res.json({ ok: true });
});

// Leaderboard (latest snapshot or compute quick)
contestsRouter.get('/:id/leaderboard', async (req, res) => {
  const contestId = req.params.id;
  const latest = await prisma.leaderboard.findFirst({ where: { contestId }, orderBy: { snapshotAt: 'desc' as const } });
  if (latest) return res.json({ leaderboard: latest });
  // fallback compute (scores all zero for now)
  const entries = await prisma.contestEntry.findMany({ where: { contestId } });
  const ranks = entries.map((e: any, i: number) => ({ entryId: e.id, score: e.finalScore ?? 0, rank: i + 1 }));
  res.json({ leaderboard: { contestId, ranks } });
});
