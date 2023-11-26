"use client";
import CreateForm from "@/components/create-form";
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
import { useParams } from "next/navigation";
import React from "react";

interface WorkspaceHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function WorkspaceHeader({ className }: WorkspaceHeaderProps) {
  const params = useParams();

  const workspaceByIdQuery = trpc.workspace.getWorkspaceById.useQuery({
    workspaceId: params.workspaceId as string,
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
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive focus:bg-destructive/10"
              disabled={workspaceByIdQuery.data?.isDemo}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex space-x-4 items-center">
        <Button variant="outline" disabled={workspaceByIdQuery.isLoading}>
          <UserPlus2 className="mr-2 w-5 h-5" />
          Add collaborators
        </Button>
        <CreateForm isLoading={workspaceByIdQuery.isLoading} />
      </div>
    </div>
  );
}
