import { Express } from 'express';
import type { VercelRequest, VercelResponse } from '@vercel/node';
export declare function createApp(): Express;
export default function handler(req: VercelRequest, res: VercelResponse): any;
