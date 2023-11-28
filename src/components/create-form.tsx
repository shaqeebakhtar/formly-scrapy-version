"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createFormSchema } from "@/schemas/create-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { trpc } from "@/utils/trpc";
import { Icons } from "./icons";

type CreateFormProps = {
  isLoading: boolean;
  workspaceId: string;
};

export default function CreateForm({
  isLoading,
  workspaceId,
}: CreateFormProps) {
  const [open, setOpen] = useState(false);

  const createFormMutation = trpc.form.createForm.useMutation();
  const context = trpc.useContext();

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
  });

  const onSubmit = (values: z.infer<typeof createFormSchema>) => {
    createFormMutation.mutate(
      {
        formName: values.formName,
        formType: values.formType,
        workspaceId,
      },
      {
        onSuccess: () => {
          context.workspace.getWorkspaceById.invalidate();
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={isLoading}>
          <Plus className="mr-2 w-4 h-4" strokeWidth={3} />
          Create form
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create a new form</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            <FormField
              control={form.control}
              name="formName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form name</FormLabel>
                  <FormControl>
                    <Input placeholder="My new form" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="formType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form name</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger id="form-type">
                        <SelectValue placeholder="Select form type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="research">Research</SelectItem>
                        <SelectItem value="survey">Survey</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="registration">
                          Registration
                        </SelectItem>
                        <SelectItem value="lead">Lead generation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={createFormMutation.isLoading}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {createFormMutation.isLoading ? (
                  <Icons.spinner className="w-4 h-4 animate-spin" />
                ) : (
                  "Continue"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
