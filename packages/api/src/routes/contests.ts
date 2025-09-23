import { Router, Router as ExpressRouter } from 'express';

export const contestsRouter: ExpressRouter = Router();

contestsRouter.get('/:id', async (req, res) => {
  res.json({ contest: { id: req.params.id, status: 'upcoming' } });
});

contestsRouter.post('/:id/join', async (req, res) => {
  res.json({ ok: true, entryId: 'demo-entry' });
});

contestsRouter.post('/:id/picks', async (req, res) => {
  const picks = (req.body?.picks as string[]) || [];
  if (picks.length !== 5) return res.status(400).json({ error: 'Pick 5' });
  res.json({ ok: true });
});
