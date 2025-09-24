import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log('Debug function started');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('Request URL:', req.url);
    console.log('Request method:', req.method);
    
    // Test environment variables
    const envCheck = {
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL: !!process.env.DATABASE_URL,
      FINNHUB_API_KEY: !!process.env.FINNHUB_API_KEY,
      JWT_SECRET: !!process.env.JWT_SECRET
    };
    
    res.json({
      message: 'Debug function working',
      environment: envCheck,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Debug function error:', error);
    res.status(500).json({
      error: 'Debug function failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}