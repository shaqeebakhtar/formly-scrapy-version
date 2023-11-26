import WorkspacesSidebar from "@/components/workspaces/sidebar";
import WorkSpacesTopbar from "@/components/workspaces/topbar";
import CreatedFormsGroup from "@/components/workspaces/workspace/created-forms-group";
import WorkspaceHeader from "@/components/workspaces/workspace/header";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Formly | Workspaces",
};

export default async function page() {
  const session = await getServerSession();

  if (!session || !session?.user) {
    redirect("/auth/login?callback=unauthorized");
  }

  return (
    <div className="bg-slate-50/50">
      <WorkSpacesTopbar className="h-16" />
      <div className="flex w-full">
        <WorkspacesSidebar className="h-[calc(100vh-64px)]" />
        <div className="px-4 py-6 lg:px-8 space-y-10 w-full">
          <WorkspaceHeader />
          <CreatedFormsGroup />
        </div>
      </div>
    </div>
  );
}
