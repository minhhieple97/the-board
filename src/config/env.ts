import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_APPWRITE_KEY: z.string().min(1),
  NEXT_PUBLIC_APPWRITE_ENDPOINT: z.string().url(),
  NEXT_PUBLIC_APPWRITE_PROJECT: z.string().min(1),
  NEXT_PUBLIC_APPWRITE_DATABASE_ID: z.string().min(1),
  NEXT_PUBLIC_APPWRITE_WORKSPACES_ID: z.string().min(1),
  NEXT_PUBLIC_APPWRITE_BUCKET_ID: z.string().min(1),
  NEXT_PUBLIC_APPWRITE_MEMBERS_ID: z.string().min(1),
});

const processEnv: Record<keyof z.infer<typeof envSchema>, string | undefined> =
  {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_APPWRITE_KEY: process.env.NEXT_APPWRITE_KEY,
    NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    NEXT_PUBLIC_APPWRITE_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
    NEXT_PUBLIC_APPWRITE_DATABASE_ID:
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    NEXT_PUBLIC_APPWRITE_WORKSPACES_ID:
      process.env.NEXT_PUBLIC_APPWRITE_WORKSPACES_ID,
    NEXT_PUBLIC_APPWRITE_BUCKET_ID: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
    NEXT_PUBLIC_APPWRITE_MEMBERS_ID:
      process.env.NEXT_PUBLIC_APPWRITE_MEMBERS_ID,
  };

const env = envSchema.parse(processEnv);

export const config = {
  appUrl: env.NEXT_PUBLIC_APP_URL,
  appwrite: {
    key: env.NEXT_APPWRITE_KEY,
    endpoint: env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    project: env.NEXT_PUBLIC_APPWRITE_PROJECT,
    databaseId: env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    workspacesId: env.NEXT_PUBLIC_APPWRITE_WORKSPACES_ID,
    membersId: env.NEXT_PUBLIC_APPWRITE_MEMBERS_ID,
    bucketId: env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
  },
} as const;

export type Config = typeof config;
