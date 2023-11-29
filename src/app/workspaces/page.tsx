import OnboardLoading from "@/components/workspaces/onboard-loading";
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

  return <OnboardLoading />;
}
