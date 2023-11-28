"use client";

import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpc";
import { Folder, FolderHeart, FolderOpen, Trash2, Users2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import CreateWorkspace from "../create-workspace";
import { buttonVariants } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

interface WorkspacesSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function WorkspacesSidebar({
  className,
}: WorkspacesSidebarProps) {
  const params = useParams();
  const workspacesQuery = trpc.workspace.getWorkspaces.useQuery();

  return (
    <div className={cn("border-r border-border bg-white w-80", className)}>
      <div className="h-full flex flex-col justify-between">
        <div className="h-full px-3 py-4">
          <div className="flex items-center justify-between pl-4">
            <span className="font-semibold text-muted-foreground">
              Workspaces
            </span>
            <CreateWorkspace isLoading={workspacesQuery.isLoading} />
          </div>
          <ScrollArea className="h-[calc(100%-3rem)] my-3">
            <div className="space-y-1">
              {workspacesQuery.isSuccess
                ? workspacesQuery.data.map((workspace) => (
                    <Link
                      href={`/workspaces/${workspace.id}`}
                      key={workspace.id}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "flex w-full items-center justify-start",
                        params.workspaceId === workspace.id &&
                          "bg-primary/10 text-primary font-semibold"
                      )}
                    >
                      {params.workspaceId === workspace.id ? (
                        <FolderOpen className="mr-2 h-4 w-4 text-current" />
                      ) : (
                        <Folder className="mr-2 h-4 w-4 text-current" />
                      )}
                      {workspace.workspaceName}
                    </Link>
                  ))
                : workspacesQuery.isLoading && (
                    <>
                      {Array.from({ length: 6 }, (_, index) => (
                        <Skeleton className="h-10 w-full" key={index} />
                      ))}
                    </>
                  )}
            </div>
          </ScrollArea>
        </div>
        <div className="h-[210px] border-t border-border px-3 py-4 space-y-1">
          <Link
            href="/workspaces/favourites"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex w-full items-center justify-start"
            )}
          >
            <Users2 className="mr-2 h-4 w-4 text-current" />
            Team Members
          </Link>
          <Link
            href="/workspaces/favourites"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex w-full items-center justify-start"
            )}
          >
            <FolderHeart className="mr-2 h-4 w-4 text-current" />
            Favourites
          </Link>
          <Link
            href="/workspaces/trash"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex w-full items-center justify-start"
            )}
          >
            <Trash2 className="mr-2 h-4 w-4 text-current" />
            Trash
          </Link>
        </div>
      </div>
    </div>
  );
}
