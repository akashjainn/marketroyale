import { Router, Router as ExpressRouter } from 'express';
import { createFinnhubAdapter } from 'shared';
import { env } from '../env';

const adapter = createFinnhubAdapter(env.FINNHUB_API_KEY);
export const marketRouter: ExpressRouter = Router();

marketRouter.get('/snapshot', async (req, res) => {
  const tickers = (req.query.tickers as string || '').split(',').filter(Boolean).slice(0, 50);
  if (!tickers.length) return res.status(400).json({ error: 'tickers required' });
  const snap = await adapter.getSnapshot(tickers);
  res.json({ snapshot: snap });
});

marketRouter.get('/ohlc', async (req, res) => {
  const { ticker, start, end, tf } = req.query as Record<string, string>;
  if (!ticker || !start || !end || !tf) return res.status(400).json({ error: 'ticker,start,end,tf required' });
  const data = await adapter.getOHLC(ticker, new Date(start), new Date(end), tf as any);
  res.json({ ohlc: data });
});
