import WorkSpacesHeader from "@/components/workspaces/header";
import WorkspacesSidebar from "@/components/workspaces/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formly | Workspaces",
};

export default function page() {
  return (
    <div className="bg-slate-50/50">
      <WorkSpacesHeader className="h-16" />
      <div className="flex w-full">
        <WorkspacesSidebar className="h-[calc(100vh-64px)]" />
        <div className="px-4 py-6 lg:px-8">hello</div>
      </div>
    </div>
  );
}
