"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { renameWorkspaceSchema } from "@/schemas/rename-workspace";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
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

type RenameWorkspaceProps = {
  workspaceId: string;
  currentWorkspaceName: string;
  open: boolean;
  setOpen: (state: boolean) => void;
};

export default function RenameWorkspace({
  workspaceId,
  currentWorkspaceName,
  open,
  setOpen,
}: RenameWorkspaceProps) {
  const form = useForm<z.infer<typeof renameWorkspaceSchema>>({
    resolver: zodResolver(renameWorkspaceSchema),
    defaultValues: {
      newWorkspaceName: currentWorkspaceName,
    },
  });

  const context = trpc.useContext();

  const renameWorkspaceMutation = trpc.workspace.renameWorkspace.useMutation();

  const onRenameWorkspace = (values: z.infer<typeof renameWorkspaceSchema>) => {
    renameWorkspaceMutation.mutate(
      {
        newWorkspaceName: values.newWorkspaceName,
        workspaceId,
      },
      {
        onSuccess: () => {
          context.workspace.getWorkspaces.invalidate();
          context.workspace.getWorkspaceById.invalidate();
          setOpen(false);
          form.reset();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Rename workspace</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onRenameWorkspace)}
            className="space-y-3 py-3"
          >
            <FormField
              control={form.control}
              name="newWorkspaceName"
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
                {!renameWorkspaceMutation.isLoading ? (
                  "Rename workspace"
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
