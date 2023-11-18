"use client";

import { cn } from "@/lib/utils";
import {
  Folder,
  FolderHeart,
  FolderOpen,
  Plus,
  Trash2,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import CreateWorkspace from "../create-workspace";
import { useParams } from "next/navigation";

interface WorkspacesSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const workspaces = [
  { id: "1", workspaceName: "Demo workspace 1" },
  { id: "2", workspaceName: "Demo workspace 2" },
  { id: "3", workspaceName: "Demo workspace 3" },
  { id: "4", workspaceName: "Demo workspace 4" },
  { id: "5", workspaceName: "Demo workspace 5" },
  { id: "6", workspaceName: "Demo workspace 6" },
  { id: "7", workspaceName: "Demo workspace 7" },
];

export default function WorkspacesSidebar({
  className,
}: WorkspacesSidebarProps) {
  const params = useParams();

  return (
    <div className={cn("border-r border-border bg-white w-80", className)}>
      <div className="h-full flex flex-col justify-between">
        <div className="h-full px-3 py-4">
          <div className="flex items-center justify-between pl-4">
            <span className="font-semibold text-muted-foreground">
              Workspaces
            </span>
            <CreateWorkspace />
          </div>
          <ScrollArea className="h-[calc(100%-3rem)] my-3">
            <div className="space-y-1">
              <Link
                href="/workspaces/demo"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "flex w-full items-center justify-start",
                  params.id === "demo" &&
                    "bg-primary/10 text-primary font-semibold"
                )}
              >
                {params.id === "demo" ? (
                  <FolderOpen className="mr-2 h-4 w-4 text-current" />
                ) : (
                  <Folder className="mr-2 h-4 w-4 text-current" />
                )}
                Demo workspace
              </Link>
              {workspaces.map((workspace) => (
                <Link
                  href={`/workspaces/${workspace.id}`}
                  key={workspace.id}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "flex w-full items-center justify-start",
                    params.id === workspace.id &&
                      "bg-primary/10 text-primary font-semibold"
                  )}
                >
                  {params.id === workspace.id ? (
                    <FolderOpen className="mr-2 h-4 w-4 text-current" />
                  ) : (
                    <Folder className="mr-2 h-4 w-4 text-current" />
                  )}
                  {workspace.workspaceName}
                </Link>
              ))}
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
