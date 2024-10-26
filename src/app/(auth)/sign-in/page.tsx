import { getCurrentUser } from "@/features/auth/actions";
import { SignInCard } from "@/features/auth/components/SignInCard";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/");
  }
  return <SignInCard />;
}
