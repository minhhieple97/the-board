import { z } from "zod";

export const createWorkspacesSchema = z.object({
  name: z.string().max(256).trim(),
});
