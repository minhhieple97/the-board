import { MIN_PASSWORD_LENGTH } from '@/constants';
import { z } from 'zod';

const baseSignUpSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, `Password must be at least ${MIN_PASSWORD_LENGTH} characters`),
  confirmPassword: z.string(),
});

export const signUpSchema = baseSignUpSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  },
);

export const serverSubmissionSchema = baseSignUpSchema.omit({ confirmPassword: true });

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
