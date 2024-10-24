'use client';
import { useSignUpCard } from '../hooks/useSignUpCard';
import { AuthCard } from './auth-card';

export const SignUpCard = () => {
  const { form, onSubmit } = useSignUpCard();

  return (
    <AuthCard
      title="Create your account"
      description={
        <>
          By signing up, you agree to our{' '}
          <a className="text-blue-700" href="/privacy">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a className="text-blue-700" href="/terms">
            Terms of Service
          </a>
        </>
      }
      form={form}
      onSubmit={onSubmit}
      fields={[
        { name: 'name', type: 'text', placeholder: 'Enter your name' },
        { name: 'email', type: 'email', placeholder: 'Enter your email' },
        { name: 'password', type: 'password', placeholder: 'Enter your password' },
        { name: 'confirmPassword', type: 'password', placeholder: 'Confirm your password' },
      ]}
      submitButtonText="Sign up"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/sign-in"
    />
  );
};
