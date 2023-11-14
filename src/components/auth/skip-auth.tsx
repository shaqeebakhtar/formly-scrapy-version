import React from "react";
import { Button } from "../ui/button";

type SkipSignupLoginProps = {
  authPage: "login" | "signup";
};

export default function SkipAuth({ authPage }: SkipSignupLoginProps) {
  return (
    <Button variant="ghost" className="text-xs capitalize">
      Skip {authPage}
    </Button>
  );
}
