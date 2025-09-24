// Vercel serverless catch-all to serve the Express API under /api/* while also hosting the built frontend.
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize app with error handling
let app: any = null;
let initError: Error | null = null;

async function getApp() {
  if (initError) {
    throw initError;
  }
  
  if (!app) {
    try {
      console.log('Initializing serverless function...');
      console.log('NODE_ENV:', process.env.NODE_ENV);
      
      // Try to import the app
      const appModule = await import('../packages/api/dist/app');
      console.log('App module imported successfully');
      
      app = appModule.createApp();
      console.log('App created successfully');
    } catch (error) {
      console.error('Failed to create app:', error);
      initError = error instanceof Error ? error : new Error('Unknown initialization error');
      throw initError;
    }
  }
  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Simple health check for debugging
  if (req.url === '/api/ping') {
    try {
      return res.json({
        message: 'Serverless function is alive',
        timestamp: new Date().toISOString(),
        url: req.url,
        method: req.method,
        env: {
          NODE_ENV: process.env.NODE_ENV,
          DATABASE_URL: !!process.env.DATABASE_URL
        }
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Ping failed',
        message: error instanceof Error ? error.message : 'Unknown ping error'
      });
    }
  }
  try {
    const appInstance = await getApp();
    // Express app handles the request
    appInstance(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    res.status(500).json({ 
      error: 'Serverless function failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
    });
  }
}
