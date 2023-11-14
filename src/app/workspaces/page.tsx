import WorkSpacesHeader from "@/components/workspaces/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formly | Workspaces",
};

export default function page() {
  return (
    <div>
      <WorkSpacesHeader />
    </div>
  );
}
