"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateWorkSpacesForm } from "../hooks/useCreateWorkSpacesForm";
type CreateWorkSpacesFormProps = {
  onCancel: () => void;
};
export const CreateWorkSpacesForm = ({
  onCancel,
}: CreateWorkSpacesFormProps) => {
  const { form, onSubmit, isPending } = useCreateWorkSpacesForm();

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Workspace</CardTitle>
        <CardDescription>
          Enter the details for your new workspace.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter workspace name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose a unique name for your workspace.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Workspace"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
