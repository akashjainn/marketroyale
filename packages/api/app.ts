import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createApp } from './src/app';

// Create the Express app
const app = createApp();

// Export a Vercel-compatible handler function
export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req as any, res as any);
}