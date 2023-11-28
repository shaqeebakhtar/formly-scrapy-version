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
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { Icons } from "./icons";

type CreateWorkspaceProps = {
  isLoading: boolean;
};

export default function CreateWorkspace({ isLoading }: CreateWorkspaceProps) {
  const [workspaceName, setWorkspaceName] = useState("");
  const [open, setOpen] = useState(false);

  const context = trpc.useContext();

  const createWorkspaceMutation = trpc.workspace.createWorkspace.useMutation({
    onSuccess: () => {
      context.workspace.getWorkspaces.invalidate();
      setOpen(false);
    },
  });

  const onCreateWorkspaceSubmit = () => {
    if (!workspaceName) return;
    createWorkspaceMutation.mutate({ workspaceName });
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
        <div className="grid gap-3 py-3">
          <Input
            id="name"
            placeholder="Workspace name"
            className="col-span-3"
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={() => onCreateWorkspaceSubmit()}>
            {!createWorkspaceMutation.isLoading ? (
              "Create workspace"
            ) : (
              <Icons.spinner className="w-4 h-4 animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
