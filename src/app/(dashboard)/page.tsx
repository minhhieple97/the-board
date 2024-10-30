import { getCurrentUser } from "@/features/auth/actions";
import { getWorkspaces } from "@/features/workspaces/actions";
import { redirect } from "next/navigation";

export default async function Page() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/sign-in");
  }

  const workspaces = await getWorkspaces();
  if (workspaces.data?.total === 0) {
    return redirect("/workspaces/create");
  }
  return redirect(`/workspaces/${workspaces.data?.documents[0].$id}`);
}
