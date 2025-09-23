import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const schema = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url().optional(),
  FMP_KEY: z.string().min(1).optional(),
  JWT_SECRET: z.string().min(10),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development')
});

export const env = schema.parse(process.env);
