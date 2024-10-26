import { getCurrentUser } from "@/features/auth/actions";
import { redirect } from "next/navigation";

export default async function Page() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/sign-in");
  }

  return <div>This is home page</div>;
}
