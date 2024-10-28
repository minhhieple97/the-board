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
import { ImageUpload } from "@/components/custom/image-upload/ImageUpload";

type CreateWorkSpacesFormProps = {
  onCancel: () => void;
};
export const CreateWorkSpacesForm = ({
  onCancel,
}: CreateWorkSpacesFormProps) => {
  const { form, onSubmit, isPending } = useCreateWorkSpacesForm();

  const handleCancel = () => {
    form.reset({
      name: "",
      image: undefined,
    });
    onCancel?.();
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Create Workspace</CardTitle>
        <CardDescription>
          Enter the details for your new workspace.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
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
            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Workspace Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={value}
                      onChange={onChange}
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload an image for your workspace (optional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={handleCancel}
            >
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
