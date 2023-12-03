"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Clock, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { trpc } from "@/utils/trpc";
import Link from "next/link";
import React from "react";

type CreatedFormProps = {
  form: {
    workspaceId: string | null;
    id: string;
    responses: number;
    createdAt: string;
    updatedAt: string;
    formName: string;
    formType: string | null;
  };
  workspaceId: string;
};

export default function CreatedForm({ form, workspaceId }: CreatedFormProps) {
  const context = trpc.useContext();

  const deleteFormMutation = trpc.form.deleteForm.useMutation();

  const onFormDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    deleteFormMutation.mutate(
      {
        workspaceId,
        formId: form.id,
      },
      {
        onSuccess: () => context.workspace.getWorkspaceById.invalidate(),
      }
    );
  };

  return (
    <Link href={`/form/${form.id}/editor`}>
      <Card className="hover:shadow-md">
        <CardHeader className="grid items-center grid-cols-[1fr_110px] gap-4 space-y-0 py-3">
          <CardTitle className="text-lg">{form.formName}</CardTitle>
          <div className="flex items-center justify-end space-x-2 rounded-md">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-3">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem>Open</DropdownMenuItem>
                <DropdownMenuItem>Copy link</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Rename</DropdownMenuItem>
                  <DropdownMenuItem disabled>Duplicate</DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger disabled className="opacity-50">
                      Move to
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>Demo Workspace 2</DropdownMenuItem>
                        <DropdownMenuItem>Demo Workspace 3</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger disabled className="opacity-50">
                      Copy to
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>Demo Workspace 2</DropdownMenuItem>
                        <DropdownMenuItem>Demo Workspace 3</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive focus:bg-destructive/10"
                  onClick={onFormDelete}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm text-muted-foreground">
            <div>
              <span>{form.responses} Responses</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              {format(new Date(form.updatedAt), "MMM dd, yyyy")}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
