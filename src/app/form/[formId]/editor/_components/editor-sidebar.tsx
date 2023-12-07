import { cn } from "@/lib/utils";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

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
            Form
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="w-full h-full rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-semibold"
            disabled
          >
            Design
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="py-2 px-4">
          <div className="grid space-y-6 py-4">
            <div className="grid space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Feedback" />
            </div>
            <div className="grid space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Please share your feedback"
              />
            </div>
            <div className="grid space-y-2">
              <Label htmlFor="buttonText">Button Text</Label>
              <Input id="buttonText" placeholder="Submit" />
            </div>
            <div className="grid space-y-2">
              <Label>Button Alignment</Label>
              <ToggleGroup type="single">
                <ToggleGroupItem
                  value="left"
                  className="flex-1 border data-[state=on]:border-primary"
                >
                  <AlignLeft className="w-4 h-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="center"
                  className="flex-1 border data-[state=on]:border-primary"
                >
                  <AlignCenter className="w-4 h-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="justify"
                  className="flex-1 border data-[state=on]:border-primary"
                >
                  <AlignJustify className="w-4 h-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="right"
                  className="flex-1 border data-[state=on]:border-primary"
                >
                  <AlignRight className="w-4 h-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="password" className="py-2 px-4">
          Change your password here.
        </TabsContent>
      </Tabs>
    </div>
  );
}
