"use client";

import { trpc } from "@/utils/trpc";
import { Icons } from "../icons";
import WorkSpacesTopbar from "./topbar";
import { redirect } from "next/navigation";

export default function OnboardLoading() {
  const workspacesQuery = trpc.workspace.getWorkspaces.useQuery();

  if (workspacesQuery.isSuccess) {
    redirect(`/workspaces/${workspacesQuery.data[0].id}`);
  }

  return (
    <div className="bg-slate-50/50">
      <WorkSpacesTopbar className="h-16" />
      <div className="w-full h-[calc(100vh-64px)] grid place-items-center">
        <Icons.spinner className="w-6 h-6 animate-spin" />
      </div>
    </div>
  );
}
