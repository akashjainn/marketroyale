import { z } from 'zod';

export const picksSchema = z.array(z.string().regex(/^[A-Z.]{1,10}$/)).length(5);
