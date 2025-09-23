import express, { Express } from 'express';
import cors from 'cors';
import { contestsRouter } from './routes/contests';
import { marketRouter } from './routes/market';
import { env } from './env';

// Factory to create an Express app without binding to a port.
// This is reused by both the local Node server (with websockets) and the Vercel serverless handler.
export function createApp(): Express {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req, res) => res.json({ ok: true, env: env.NODE_ENV }));
  app.use('/api/contests', contestsRouter);
  app.use('/api/market', marketRouter);

  return app;
}

// Allow direct execution (optional) for simple debugging without websockets.
if (require.main === module) {
  const app = createApp();
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`API (no realtime) listening on :${port}`));
}
