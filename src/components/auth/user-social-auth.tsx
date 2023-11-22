"use client";
import React from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons";
import { signIn } from "next-auth/react";

type Props = {};

export default function UserSocialAuth({}: Props) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="w-full"
        type="button"
        disabled={isLoading}
        onClick={() => signIn("google")}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
      <Button
        variant="outline"
        className="w-full"
        type="button"
        disabled={isLoading}
        onClick={() => signIn("twitter")}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.twitter className="mr-2 h-4 w-4" />
        )}{" "}
        Twitter
      </Button>
    </div>
  );
}
