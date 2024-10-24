'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { UseFormReturn } from 'react-hook-form';
import { Path } from 'react-hook-form';
import { ReactNode } from 'react';

type FormFieldValue = string | number | readonly string[] | undefined;

type AuthCardProps<T extends Record<string, FormFieldValue>> = {
  title: string;
  description?: ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  fields: Array<{
    name: Path<T>;
    type: string;
    placeholder: string;
  }>;
  submitButtonText: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
};

export const AuthCard = <T extends Record<string, FormFieldValue>>({
  title,
  description,
  form,
  onSubmit,
  fields,
  submitButtonText,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthCardProps<T>) => {
  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field) => (
              <FormField
                key={field.name as string}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...formField} type={field.type} placeholder={field.placeholder} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" className="w-full">
              {submitButtonText}
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="p-7 flex flex-col gap-4">
        <Button variant="secondary" className="w-full">
          <FcGoogle className="mr-2 size-5" />
          {submitButtonText} with Google
        </Button>
        <Button variant="secondary" className="w-full">
          <FaGithub className="mr-2 size-5" />
          {submitButtonText} with Github
        </Button>
      </CardContent>
      <div className="px-7">
        <Separator />
      </div>
      <CardFooter className="p-7 flex justify-center">
        <p className="text-sm text-center">
          {footerText}{' '}
          <Link className="text-blue-700" href={footerLinkHref}>
            {footerLinkText}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
