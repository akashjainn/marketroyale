import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Enhanced env loading: try local package .env, then repo root .env (two levels up)
if (process.env.NODE_ENV !== 'production') {
  const tried: string[] = [];
  function tryLoad(p: string) {
    tried.push(p);
    if (fs.existsSync(p)) {
      dotenv.config({ path: p });
      return true;
    }
    return false;
  }
  const localEnv = path.resolve(process.cwd(), '.env');
  const rootEnv = path.resolve(process.cwd(), '../../.env');
  if (!tryLoad(localEnv)) {
    tryLoad(rootEnv);
  }
  if (!process.env.DATABASE_URL) {
    console.warn('ENV: DATABASE_URL not set. Tried:', tried.join(', '));
  }
}

const schema = z.object({
  DATABASE_URL: z.string().min(1).optional(), // Make DATABASE_URL optional for now
  REDIS_URL: z.string().url().optional(),
  FINNHUB_API_KEY: z.string().optional(),
  JWT_SECRET: z.string().min(10).default('devsecret_dev_only'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development')
});

export const env = schema.parse(process.env);
