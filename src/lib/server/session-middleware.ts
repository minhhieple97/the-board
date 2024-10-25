import 'server-only';

import {
  Client,
  Account,
  Databases,
  Storage,
  Models,
  type Account as AccountType,
  type Storage as StorageType,
  type Databases as DatabasesType,
  type Users as UsersType,
} from 'node-appwrite';
import { config } from '@/config/env';
import { getCookie } from 'hono/cookie';
import { AUTH_COOKIE_NAME } from '@/constants';
import { createMiddleware } from 'hono/factory';
type AdditionalContext = {
  Variables: {
    account: AccountType;
    databases: DatabasesType;
    storage: StorageType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};
export const sessionMiddleware = createMiddleware<AdditionalContext>(async (c, next) => {
  const client = new Client()
    .setEndpoint(config.appwrite.endpoint)
    .setProject(config.appwrite.project);

  const session = getCookie(c, AUTH_COOKIE_NAME);
  if (!session) {
    return c.json({ error: 'No session' }, 401);
  }
  client.setSession(session);
  const account = new Account(client);
  const databases = new Databases(client);
  const storage = new Storage(client);

  const user = await account.get();
  c.set('user', user);
  c.set('databases', databases);
  c.set('storage', storage);
  c.set('account', account);
  await next();
});
