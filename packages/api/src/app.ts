import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { contestsRouter } from './routes/contests';
import { marketRouter } from './routes/market';
import { env } from './env';

// Factory to create an Express app without binding to a port.
// This is reused by both the local Node server (with websockets) and the Vercel serverless handler.
export function createApp(): Express {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/', (_req, res) => {
    res.json({
      service: 'marketroyale-api',
      status: 'ok',
      health: '/api/health'
    });
  });

  // Health check that shows service status
  app.get('/api/health', (_req, res) => {
    const status = {
      ok: true,
      env: env.NODE_ENV,
      database: !!process.env.DATABASE_URL,
      marketAPI: !!env.FINNHUB_API_KEY,
      timestamp: new Date().toISOString()
    };
    res.json(status);
  });
  
  app.use('/api/contests', contestsRouter);
  app.use('/api/market', marketRouter);

  // Only attempt to serve pre-built static frontend in production builds (Vercel) –
  // during local dev we rely on Vite dev server + proxy.
  if (process.env.NODE_ENV === 'production') {
    const staticDir = path.resolve(process.cwd(), 'dist');
    const indexFile = path.join(staticDir, 'index.html');
    if (fs.existsSync(staticDir) && fs.existsSync(indexFile)) {
      app.use(express.static(staticDir));
      app.get('*', (req, res, next) => {
        if (req.path?.startsWith('/api')) return next();
        res.sendFile(indexFile);
      });
    } else {
      console.warn('Static frontend assets not found at', staticDir);
    }
  }

  // Global error handler
  app.use((err: any, _req: any, res: any, _next: any) => {
    console.error('API Error:', err);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: process.env.NODE_ENV === 'development' ? err.message : undefined 
    });
  });

  return app;
}

// Vercel serverless handler - default export must be a function
const app = createApp();
export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req as any, res as any);
}

// Allow direct execution (optional) for simple debugging without websockets.
if (require.main === module) {
  const appInstance = createApp();
  const port = process.env.PORT || 4000;
  appInstance.listen(port, () => console.log(`API (no realtime) listening on :${port}`));
}
