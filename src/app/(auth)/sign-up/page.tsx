import { SignUpCard } from "@/features/auth/components/SignUpCard";
import { getCurrentUser } from "@/features/auth/actions";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/");
  }
  return <SignUpCard />;
}
