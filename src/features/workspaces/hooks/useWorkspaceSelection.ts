import { useRouter, useParams } from "next/navigation";
import { useGetWorkspaces } from "../api/useGetWorkSpaces";

export const useWorkspaceSelection = () => {
  const { data: workspaces } = useGetWorkspaces();
  const router = useRouter();
  const params = useParams();

  const selectedWorkspaceId = params?.workspacesId as string;

  const handleWorkspaceChange = (workspaceId: string) => {
    router.push(`/workspaces/${workspaceId}`);
  };

  return {
    workspaces,
    selectedWorkspaceId,
    handleWorkspaceChange,
  };
};
