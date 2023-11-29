"use client";
import CreateForm from "@/components/dialogs/create-form";
import RenameWorkspace from "@/components/dialogs/rename-workspace";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpc";
import { MoreHorizontal, UserPlus2 } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import React, { useState } from "react";

interface WorkspaceHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function WorkspaceHeader({ className }: WorkspaceHeaderProps) {
  const params = useParams();
  const [renameOpen, setRenameOpen] = useState(false);

  const workspaceByIdQuery = trpc.workspace.getWorkspaceById.useQuery({
    workspaceId: params.workspaceId as string,
  });

  const context = trpc.useContext();

  const deleteWorkspaceMutation = trpc.workspace.deleteWorkspace.useMutation({
    onSuccess: () => {
      context.workspace.getWorkspaces.invalidate();
      redirect("/workspaces/");
    },
  });

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex space-x-4 items-center">
        {!workspaceByIdQuery.isLoading && workspaceByIdQuery.isSuccess ? (
          <h2 className="text-xl font-semibold tracking-tight">
            {workspaceByIdQuery.data?.workspaceName}
          </h2>
        ) : (
          <Skeleton className="h-8 w-[200px]" />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="px-3 py-3"
              disabled={workspaceByIdQuery.isLoading}
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuItem onClick={() => setRenameOpen(true)}>
              Rename
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive focus:bg-destructive/10"
              disabled={workspaceByIdQuery.data?.isDemo!}
              onClick={() =>
                deleteWorkspaceMutation.mutate({
                  workspaceId: params.workspaceId as string,
                })
              }
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <RenameWorkspace
          open={renameOpen}
          setOpen={setRenameOpen}
          workspaceId={params.workspaceId as string}
          currentWorkspaceName={workspaceByIdQuery.data?.workspaceName!}
        />
      </div>
      <div className="flex space-x-4 items-center">
        <Button variant="outline" disabled={workspaceByIdQuery.isLoading}>
          <UserPlus2 className="mr-2 w-5 h-5" />
          Add collaborators
        </Button>
        <CreateForm
          isLoading={workspaceByIdQuery.isLoading}
          workspaceId={params.workspaceId as string}
        />
      </div>
    </div>
  );
}
