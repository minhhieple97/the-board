"use server";

import { Account, Client, Databases } from "node-appwrite";
import { config } from "@/config/env";
import { Query } from "node-appwrite";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/constants";

export async function getWorkspaces() {
  try {
    // Get session from cookies
    const cookieStore = cookies();
    const session = cookieStore.get(AUTH_COOKIE_NAME);

    if (!session?.value) {
      return { data: { documents: [], total: 0 } };
    }

    // Initialize Appwrite client with session
    const client = new Client()
      .setEndpoint(config.appwrite.endpoint)
      .setProject(config.appwrite.project)
      .setSession(session.value);

    const databases = new Databases(client);
    const account = new Account(client);
    const user = await account.get();

    // First get all memberships for the current user
    const members = await databases.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.membersId,
      [Query.equal("userId", user.$id)],
    );

    // If user has no memberships, return empty array
    if (members.documents.length === 0) {
      return { data: { documents: [], total: 0 } };
    }

    // Get all workspace IDs from memberships
    const workspaceIds = members.documents.map((member) => member.workspaceId);

    // Fetch workspaces
    const workspaces = await databases.listDocuments(
      config.appwrite.databaseId,
      config.appwrite.workspacesId,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)],
    );

    return {
      data: {
        documents: workspaces.documents,
        total: workspaces.total,
      },
    };
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    return { data: { documents: [], total: 0 } };
  }
}
