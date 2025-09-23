import express from 'express';
import http from 'http';
import cors from 'cors';
import { contestsRouter } from './routes/contests';
import { marketRouter } from './routes/market';
import { setupRealtime } from './realtime/socket';
import { env } from './env';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.use('/api/contests', contestsRouter);
app.use('/api/market', marketRouter);

const server = http.createServer(app);
setupRealtime(server);

const port = 4000;
server.listen(port, () => {
  console.log(`API listening on :${port} env=${env.NODE_ENV}`);
});
