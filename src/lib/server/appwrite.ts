'use server';
import 'server-only';
import { Client, Account } from 'node-appwrite';
import { config } from '@/config/env';
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(config.appwrite.endpoint)
    .setProject(config.appwrite.project)
    .setKey(config.appwrite.key);

  return {
    get account() {
      return new Account(client);
    },
  };
}
