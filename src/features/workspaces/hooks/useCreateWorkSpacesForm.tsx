import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkspacesSchema } from "../schemas";
import { z } from "zod";
import { useCreateWorkspaces } from "../api/useCreateWorkSpaces";
type CreateWorkSpacesFormValues = z.infer<typeof createWorkspacesSchema>;
export const useCreateWorkSpacesForm = () => {
  const { mutate, isPending } = useCreateWorkspaces();
  const form = useForm<CreateWorkSpacesFormValues>({
    resolver: zodResolver(createWorkspacesSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });
  const onSubmit = async (data: CreateWorkSpacesFormValues) => {
    const finalData = {
      ...data,
      image: data.image instanceof File ? data.image : undefined,
    };
    mutate(
      { form: finalData },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
  };

  return { form, onSubmit, isPending };
};
