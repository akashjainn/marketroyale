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

// Allow direct execution (optional) for simple debugging without websockets.
if (require.main === module) {
  const app = createApp();
  const port = process.env.PORT || 4000;
  app.listen(port, () => console.log(`API (no realtime) listening on :${port}`));
}
