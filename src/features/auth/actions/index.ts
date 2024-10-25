"use server";

import { config } from "@/config/env";
import { AUTH_COOKIE_NAME } from "@/constants";
import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";

export const getCurrentUser = async () => {
  try {
    const client = new Client()
      .setEndpoint(config.appwrite.endpoint)
      .setProject(config.appwrite.project);

    const session = cookies().get(AUTH_COOKIE_NAME);
    if (!session) {
      return null;
    }
    client.setSession(session.value);
    const account = new Account(client);
    return account.get();
  } catch (error) {
    console.error(error);
    return null;
  }
};
