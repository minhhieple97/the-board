import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono/client";
import { QUERY_KEYS } from "@/constants";
import { toast } from "sonner";
type RequestType = InferRequestType<typeof client.api.workspaces.$post>;
type ResponseType = InferResponseType<typeof client.api.workspaces.$post>;

export const useCreateWorkspaces = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      const response = await client.api.workspaces.$post({ form });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.WORKSPACES] });
      toast.success("Workspace created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};
