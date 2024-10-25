import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/rpc';
import { QUERY_KEYS } from '@/constants';

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CURRENT_USER],
    queryFn: async () => {
      const response = await client.api.auth.me.$get();
      if (!response.ok) return null;
      return response.json();
    },
  });
};
