import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { serverSubmissionSchema, signInSchema } from '../schemas';
import { ID, AppwriteException } from 'node-appwrite';
import { createAdminClient } from '@/lib/server/appwrite';
import { deleteCookie, setCookie } from 'hono/cookie';
import { AUTH_COOKIE_NAME, MAX_AUTH_COOKIE_AGE } from '@/constants';
import { sessionMiddleware } from '@/lib/server/session-middleware';

const app = new Hono()
  .post('/login', zValidator('json', signInSchema), async (c) => {
    const { email, password } = c.req.valid('json');

    try {
      const { account } = await createAdminClient();

      const session = await account.createEmailPasswordSession(email, password);

      setCookie(c, AUTH_COOKIE_NAME, session.secret, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: MAX_AUTH_COOKIE_AGE,
      });

      return c.json({ success: true });
    } catch (error) {
      if (error instanceof AppwriteException) {
        console.error('Login error:', error.message);
        return c.json({ success: false, error: 'Invalid email or password' }, 401);
      }
      console.error('Unexpected error during login:', error);
      return c.json({ success: false, error: 'An unexpected error occurred' }, 500);
    }
  })
  .post('/signup', zValidator('json', serverSubmissionSchema), async (c) => {
    const { username, email, password } = c.req.valid('json');

    try {
      const { account } = await createAdminClient();

      await account.create(ID.unique(), email, password, username);

      const session = await account.createEmailPasswordSession(email, password);

      setCookie(c, AUTH_COOKIE_NAME, session.secret, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        maxAge: MAX_AUTH_COOKIE_AGE,
      });

      return c.json({ success: true });
    } catch (error) {
      if (error instanceof AppwriteException) {
        console.error('Signup error:', error.message);
        return c.json({ success: false, error: error.message }, 400);
      }
      console.error('Unexpected error during signup:', error);
      return c.json({ success: false, error: 'Failed to create user' }, 500);
    }
  })
  .post('/logout', sessionMiddleware, async (c) => {
    try {
      const account = c.get('account');
      deleteCookie(c, AUTH_COOKIE_NAME);
      await account.deleteSession('current');
      return c.json({ success: true });
    } catch (error) {
      console.error('Logout error:', error);
      return c.json({ success: false, error: 'Failed to logout' }, 500);
    }
  })
  .get('/me', sessionMiddleware, async (c) => {
    try {
      const user = c.get('user');
      return c.json({ data: user });
    } catch (error) {
      console.error('Error fetching user info:', error);
      return c.json({ success: false, error: 'Failed to fetch user information' }, 500);
    }
  });

export default app;
