// Vercel serverless catch-all to serve the Express API under /api/* while also hosting the built frontend.
// We import the Express app factory from the api package source. Websockets (Socket.IO) are not enabled here
// because standard serverless functions are stateless; for realtime you may deploy a separate long-lived server
// (e.g., using a separate Vercel Edge/Websocket-compatible deployment or another host like Fly.io/Render).
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize app with error handling
let app: any = null;

async function getApp() {
  if (!app) {
    try {
      const { createApp } = await import('../packages/api/src/app');
      app = createApp();
    } catch (error) {
      console.error('Failed to create app:', error);
      throw error;
    }
  }
  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const appInstance = await getApp();
    // Strip the leading "/api" segment because Vercel invokes this function for any /api/* route.
    // However, Express route definitions already include /api prefixes, so we leave the path intact.
    appInstance(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    res.status(500).json({ 
      error: 'Serverless function failed to initialize',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
