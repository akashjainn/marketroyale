import { Router, Router as ExpressRouter } from 'express';

export const marketRouter: ExpressRouter = Router();

marketRouter.get('/quote', async (req, res) => {
  const symbol = req.query.symbol as string;
  res.json({ symbol, price: 100, changePct: 0 });
});

marketRouter.get('/search', async (req, res) => {
  const q = (req.query.q as string) || '';
  res.json({ results: q ? [{ symbol: 'AAPL', name: 'Apple Inc.' }] : [] });
});

marketRouter.get('/candles', async (_req, res) => {
  res.json({ candles: [] });
});
