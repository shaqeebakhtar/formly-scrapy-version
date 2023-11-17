import WorkSpacesTopbar from "@/components/workspaces/topbar";
import WorkspacesSidebar from "@/components/workspaces/sidebar";
import { Metadata } from "next";
import WorkspaceHeader from "@/components/workspaces/workspace/header";
import CreateFormsGroup from "@/components/workspaces/workspace/created-forms-group";

export const metadata: Metadata = {
  title: "Formly | Workspaces",
};

export default function page() {
  return (
    <div className="bg-slate-50/50">
      <WorkSpacesTopbar className="h-16" />
      <div className="flex w-full">
        <WorkspacesSidebar className="h-[calc(100vh-64px)]" />
        <div className="px-4 py-6 lg:px-8 space-y-10 w-full">
          <WorkspaceHeader />
          <CreateFormsGroup />
        </div>
      </div>
    </div>
  );
}
