"use client";

import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function ToastNotification() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const router = useRouter();
  const callback = searchParams.get("callback");

  if (callback === "unauthorized") {
    toast({
      title: "You need to be logged in",
      description: "Try to login first and then access the page.",
      variant: "destructive",
    });
    router.replace("/auth/login");
  }

  return <></>;
}
