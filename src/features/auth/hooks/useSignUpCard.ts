import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { serverSubmissionSchema, signUpSchema } from "../schemas";
import { useSignUp } from "../api/useSignup";

type SignUpFormValues = z.infer<typeof signUpSchema>;
export type ServerSubmissionValues = z.infer<typeof serverSubmissionSchema>;
export const useSignUpCard = () => {
  const { mutate, isPending } = useSignUp();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: SignUpFormValues) => {
    const serverValues: ServerSubmissionValues = {
      username: values.username,
      email: values.email,
      password: values.password,
    };
    mutate({ json: serverValues });
  };

  return { form, onSubmit, isPending };
};
