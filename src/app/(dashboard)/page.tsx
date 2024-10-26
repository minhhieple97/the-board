import { getCurrentUser } from "@/features/auth/actions";
import { CreateWorkSpacesForm } from "@/features/workspaces/components/CreateWorkSpacesForm";
import { redirect } from "next/navigation";

export default async function Page() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/sign-in");
  }

  return <CreateWorkSpacesForm />;
}
