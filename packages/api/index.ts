import express from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const app = express();
app.get('/api/minimal', (_req, res) => res.json({ route: 'minimal' }));
app.get('/api/debug', (_req, res) => res.json({ env: Object.keys(process.env) }));

export default function handler(req: VercelRequest, res: VercelResponse) {
  // @ts-ignore express is a requestListener:
  return app(req as any, res as any);
}
