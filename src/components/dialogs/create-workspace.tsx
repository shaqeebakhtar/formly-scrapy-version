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
import { createWorkspaceSchema } from "@/schemas/create-workspace";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type CreateWorkspaceProps = {
  isLoading: boolean;
};

export default function CreateWorkspace({ isLoading }: CreateWorkspaceProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
  });

  const context = trpc.useContext();

  const createWorkspaceMutation = trpc.workspace.createWorkspace.useMutation();

  const onCreateWorkspace = (values: z.infer<typeof createWorkspaceSchema>) => {
    createWorkspaceMutation.mutate(
      {
        workspaceName: values.workspaceName,
      },
      {
        onSuccess: () => {
          context.workspace.getWorkspaces.invalidate();
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="px-3 py-3" disabled={isLoading}>
          <Plus className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create a new workspace</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onCreateWorkspace)}
            className="space-y-4 py-3"
          >
            <FormField
              control={form.control}
              name="workspaceName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Workspace name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">
                {!createWorkspaceMutation.isLoading ? (
                  "Create workspace"
                ) : (
                  <Icons.spinner className="w-4 h-4 animate-spin" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
