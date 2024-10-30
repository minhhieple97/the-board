import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createWorkspacesSchema } from "../schemas";
import { ID, AppwriteException, Query } from "node-appwrite";
import { sessionMiddleware } from "@/lib/server/session-middleware";
import { config } from "@/config/env";
import { MEMBER_TYPES } from "@/constants";
import { generateRandomString } from "@/lib/utils";

const app = new Hono()
  .post(
    "/",
    sessionMiddleware,
    zValidator("form", createWorkspacesSchema),
    async (c) => {
      const { name, image } = c.req.valid("form");
      const user = c.get("user");
      const storage = c.get("storage");
      try {
        const databases = c.get("databases");
        let uploadedImageUrl: string | undefined;
        if (image instanceof File) {
          const file = await storage.createFile(
            config.appwrite.bucketId,
            ID.unique(),
            image,
          );
          const arrayBuffer = await storage.getFilePreview(
            config.appwrite.bucketId,
            file.$id,
          );
          const base64Image = Buffer.from(arrayBuffer).toString("base64");
          uploadedImageUrl = `data:image/png;base64,${base64Image}`;
        }
        const workspace = await databases.createDocument(
          config.appwrite.databaseId,
          config.appwrite.workspacesId,
          ID.unique(),
          {
            name,
            userId: user.$id,
            imageUrl: uploadedImageUrl,
            inviteCode: generateRandomString(8),
          },
        );

        await databases.createDocument(
          config.appwrite.databaseId,
          config.appwrite.membersId,
          ID.unique(),
          {
            userId: user.$id,
            workspaceId: workspace.$id,
            role: MEMBER_TYPES.USER,
          },
        );

        return c.json({ success: true, data: workspace });
      } catch (error) {
        if (error instanceof AppwriteException) {
          console.error("Workspace creation error:", error.message);
          return c.json({ success: false, error: error.message }, 400);
        }
        console.error("Unexpected error during workspace creation:", error);
        return c.json(
          { success: false, error: "Failed to create workspace" },
          500,
        );
      }
    },
  )
  .get("/", sessionMiddleware, async (c) => {
    try {
      const databases = c.get("databases");
      const user = c.get("user");
      const members = await databases.listDocuments(
        config.appwrite.databaseId,
        config.appwrite.membersId,
        [Query.equal("userId", user.$id)],
      );
      if (members.documents.length === 0) {
        return c.json({ data: { documents: [] } });
      }
      const workspaceIds = members.documents.map(
        (member) => member.workspaceId,
      );
      const workspaces = await databases.listDocuments(
        config.appwrite.databaseId,
        config.appwrite.workspacesId,
        [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)],
      );

      return c.json({ data: workspaces });
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      return c.json(
        { success: false, error: "Failed to fetch workspaces" },
        500,
      );
    }
  });

export default app;
