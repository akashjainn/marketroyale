// Vercel serverless catch-all to serve the Express API under /api/* while also hosting the built frontend.
// We import the Express app factory from the api package source. Websockets (Socket.IO) are not enabled here
// because standard serverless functions are stateless; for realtime you may deploy a separate long-lived server
// (e.g., using a separate Vercel Edge/Websocket-compatible deployment or another host like Fly.io/Render).
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createApp } from '../packages/api/src/app';

// Reuse a single app instance across invocations (cold start optimization).
const app = createApp();

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Strip the leading "/api" segment because Vercel invokes this function for any /api/* route.
  // However, Express route definitions already include /api prefixes, so we leave the path intact.
  (app as any)(req, res);
}
