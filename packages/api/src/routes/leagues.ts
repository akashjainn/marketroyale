import { Router } from 'express';

export const leaguesRouter = Router();

leaguesRouter.get('/', async (_req, res) => {
  res.json({ leagues: [] });
});

leaguesRouter.post('/', async (_req, res) => {
  res.json({ ok: true, id: 'new-league' });
});
