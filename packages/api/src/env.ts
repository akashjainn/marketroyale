import { z } from 'zod';
import dotenv from 'dotenv';

// Only load .env file if not in production (Vercel provides env vars directly)
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const schema = z.object({
  DATABASE_URL: z.string().min(1).optional(), // Make DATABASE_URL optional for now
  REDIS_URL: z.string().url().optional(),
  FINNHUB_API_KEY: z.string().optional(),
  JWT_SECRET: z.string().min(10).default('devsecret_dev_only'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development')
});

export const env = schema.parse(process.env);
