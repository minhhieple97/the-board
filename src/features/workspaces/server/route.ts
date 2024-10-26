import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createWorkspacesSchema } from "../schemas";
import { ID, AppwriteException } from "node-appwrite";
import { sessionMiddleware } from "@/lib/server/session-middleware";
import { config } from "@/config/env";

const app = new Hono()
  .post(
    "/",
    sessionMiddleware,
    zValidator("json", createWorkspacesSchema),
    async (c) => {
      const { name } = c.req.valid("json");
      const user = c.get("user");
      try {
        const databases = c.get("databases");

        const workspace = await databases.createDocument(
          config.appwrite.databaseId,
          config.appwrite.workspacesId,
          ID.unique(),
          {
            name,
            userId: user.$id,
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
  .get("/list", sessionMiddleware, async (c) => {
    try {
      const databases = c.get("databases");

      const workspaces = await databases.listDocuments(
        "main", // Replace with your actual database ID
        "workspaces", // Replace with your actual collection ID
        [],
      );

      return c.json({ success: true, data: workspaces.documents });
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      return c.json(
        { success: false, error: "Failed to fetch workspaces" },
        500,
      );
    }
  });

export default app;
