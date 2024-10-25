import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { serverSubmissionSchema, signInSchema } from '../schemas';

const app = new Hono()
  .post('/login', zValidator('json', signInSchema), async (c) => {
    const { email, password } = c.req.valid('json');
    return c.json({ email, password });
  })
  .post('/signup', zValidator('json', serverSubmissionSchema), async (c) => {
    const { username, email, password } = c.req.valid('json');
    return c.json({ username, email, password });
  });

export default app;
