import React from "react";
import { Icons } from "../icons";

export default function AuthDisplay() {
  return (
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div className="absolute inset-0 bg-foreground" />
      <div className="relative z-20 flex items-center text-lg font-medium">
        <Icons.logo className="mr-2 h-6 w-6" />
        Formly
      </div>
      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <p className="text-lg">
            &ldquo;Formly has helped me create stunning forms without any hassle
            for my surveys.&rdquo;
          </p>
          <footer className="text-sm">John Doe</footer>
        </blockquote>
      </div>
    </div>
  );
}
