import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono/client";
import { useRouter } from "next/navigation";
import { QUERY_KEYS } from "@/constants";
type RequestType = InferRequestType<typeof client.api.auth.login.$post>;
type ResponseType = InferResponseType<typeof client.api.auth.login.$post>;

export const useSignIn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login.$post({ json });
      return response.json();
    },
    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CURRENT_USER] });
    },
  });
  return mutation;
};
