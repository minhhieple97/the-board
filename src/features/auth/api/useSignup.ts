import { useMutation } from '@tanstack/react-query';
import { client } from '@/lib/rpc';
import { InferRequestType, InferResponseType } from 'hono/client';
type RequestType = InferRequestType<typeof client.api.auth.signup.$post>;
type ResponseType = InferResponseType<typeof client.api.auth.signup.$post>;

export const useSignUp = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.signup.$post({ json });
      return response.json();
    },
  });
  return mutation;
};
