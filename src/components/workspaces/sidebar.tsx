import { cn } from "@/lib/utils";
import { Folder, FolderHeart, FolderOpen, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

interface WorkspacesSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function WorkspacesSidebar({
  className,
}: WorkspacesSidebarProps) {
  return (
    <div className={cn("border-r border-border bg-white w-72", className)}>
      <div className="h-full flex flex-col justify-between">
        <div className="h-full px-3 py-4">
          <div className="flex items-center justify-between pl-4">
            <span className="font-semibold text-muted-foreground">
              Workspaces
            </span>
            <Button variant="secondary" className="px-3 py-3">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          <ScrollArea className="h-[calc(100%-3rem)] my-3">
            <div className="space-y-1">
              <Link
                href=""
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "flex w-full items-center justify-start bg-primary/10 text-primary font-semibold"
                )}
              >
                <FolderOpen className="mr-2 h-4 w-4 text-current" />
                Demo Workspace
              </Link>
              <Link
                href=""
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "flex w-full items-center justify-start"
                )}
              >
                <Folder className="mr-2 h-4 w-4 text-current" />
                Demo Workspace 2
              </Link>
            </div>
          </ScrollArea>
        </div>
        <div className="h-[150px] border-t border-border px-3 py-4 space-y-1">
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
