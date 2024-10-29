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

      const workspaces = await databases.listDocuments(
        config.appwrite.databaseId,
        config.appwrite.workspacesId,
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
