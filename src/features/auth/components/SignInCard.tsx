"use client";
import { useSignInCard } from "../hooks/useSignInCard";
import { AuthCard } from "./AuthCard";

export const SignInCard = () => {
  const { form, onSubmit, isPending } = useSignInCard();

  return (
    <AuthCard
      title="Welcome back!"
      form={form}
      onSubmit={onSubmit}
      fields={[
        { name: "email", type: "email", placeholder: "Enter your email" },
        {
          name: "password",
          type: "password",
          placeholder: "Enter your password",
        },
      ]}
      submitButtonText="Sign in"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLinkHref="/sign-up"
      disabled={isPending}
    />
  );
};
