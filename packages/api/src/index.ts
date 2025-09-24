import http from 'http';
import { setupRealtime } from './realtime/socket';
import { createApp } from './app';
import { env } from './env';

// Local development entrypoint with websockets. In Vercel serverless we use app.ts via api/[...all].ts.
const app = createApp();
const server = http.createServer(app);
setupRealtime(server);

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`API (realtime enabled) listening on :${port} env=${env.NODE_ENV}`));
