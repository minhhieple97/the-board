import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants";
import { z } from "zod";

export const createWorkspacesSchema = z.object({
  name: z.string().max(256).trim().min(1, "Name is required"),
  image: z
    .union([
      z.string().transform((val) => (val === "" ? undefined : val)),
      z.custom<File>((file) => {
        if (!(file instanceof File)) return false;
        if (file.size > MAX_FILE_SIZE) return false;
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return false;
        return true;
      }, "File must be a PNG or JPEG image under 1MB"),
    ])
    .optional(),
});
