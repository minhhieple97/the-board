import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signInSchema } from '../schemas';
import { useSignIn } from '../api/useSignin';

type SignInFormValues = z.infer<typeof signInSchema>;

export const useSignInCard = () => {
  const { mutate } = useSignIn();
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInFormValues) => {
    mutate({ json: data });
  };

  return { form, onSubmit };
};
