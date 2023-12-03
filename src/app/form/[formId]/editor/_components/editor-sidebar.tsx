import { cn } from "@/lib/utils";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EditorSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function EditorSidebar({ className }: EditorSidebarProps) {
  return (
    <div className={cn("border-l border-border bg-white w-96", className)}>
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w-full h-12 rounded-none p-0 border-b bg-background">
          <TabsTrigger
            value="account"
            className="w-full h-full rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none  data-[state=active]:font-semibold"
          >
            <span>Question</span>
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="w-full h-full rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-semibold"
          >
            Design
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="py-2 px-4">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password" className="py-2 px-4">
          Change your password here.
        </TabsContent>
      </Tabs>
    </div>
  );
}
