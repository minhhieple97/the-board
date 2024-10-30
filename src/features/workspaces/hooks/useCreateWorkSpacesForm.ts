import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkspacesSchema } from "../schemas";
import { z } from "zod";
import { useCreateWorkspaces } from "../api/useCreateWorkSpaces";
import { useRouter } from "next/navigation";

type CreateWorkSpacesFormValues = z.infer<typeof createWorkspacesSchema>;
export const useCreateWorkSpacesForm = () => {
  const router = useRouter();
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (response: any) => {
          form.reset();
          if (response.data) {
            router.push(`/workspaces/${response.data.$id}`);
          }
        },
      },
    );
  };

  return { form, onSubmit, isPending };
};
