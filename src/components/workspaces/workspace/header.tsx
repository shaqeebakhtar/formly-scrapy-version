import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Plus, UserPlus2 } from "lucide-react";
import React from "react";

interface WorkspaceHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function WorkspaceHeader({ className }: WorkspaceHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex space-x-4 items-center">
        <h2 className="text-xl font-semibold tracking-tight">Demo Workspace</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="px-3 py-3">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex space-x-4 items-center">
        <Button variant="outline">
          <UserPlus2 className="mr-2 w-5 h-5" />
          Add collaborators
        </Button>
        <Button>
          <Plus className="mr-2 w-4 h-4" strokeWidth={3} />
          Create form
        </Button>
      </div>
    </div>
  );
}
