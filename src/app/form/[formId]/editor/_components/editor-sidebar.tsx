'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react';
import { useEditorFormStore } from '@/store/editor-form-store';
import { Textarea } from '@/components/ui/textarea';

interface EditorSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function EditorSidebar({ className }: EditorSidebarProps) {
  const { formTitle, setFormTitle } = useEditorFormStore((state) => state);
  const { formDescription, setFormDescription } = useEditorFormStore(
    (state) => state
  );
  const { formSubmitText, setFormSubmitText } = useEditorFormStore(
    (state) => state
  );
  const { buttonAlignment, setButtonAlignment } = useEditorFormStore(
    (state) => state
  );

  return (
    <div className={cn('border-l border-border bg-white w-96', className)}>
      <Tabs defaultValue="question" className="w-full">
        <TabsList className="w-full h-12 rounded-none p-0 border-b bg-background">
          <TabsTrigger
            value="question"
            className="w-full h-full rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none  data-[state=active]:font-semibold"
          >
            Form
          </TabsTrigger>
          <TabsTrigger
            value="design"
            className="w-full h-full rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-semibold"
            disabled
          >
            Design
          </TabsTrigger>
        </TabsList>
        <TabsContent value="question" className="py-2 px-4">
          <div className="grid space-y-6 py-4">
            <div className="grid space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Feedback"
                value={formTitle}
                onChange={(e) => setFormTitle(e.currentTarget.value)}
              />
            </div>
            <div className="grid space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.currentTarget.value)}
                placeholder="Please share your feedback"
              />
            </div>
            <div className="grid space-y-2">
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                placeholder="Submit"
                value={formSubmitText}
                onChange={(e) => setFormSubmitText(e.currentTarget.value)}
              />
            </div>
            <div className="grid space-y-2">
              <Label>Button Alignment</Label>
              <ToggleGroup
                type="single"
                value={buttonAlignment}
                onValueChange={(value) => {
                  if (value) setButtonAlignment(value);
                }}
              >
                <ToggleGroupItem
                  value="left"
                  data-state={buttonAlignment === 'left' ? 'on' : 'off'}
                  className="flex-1 border data-[state=on]:border-primary"
                >
                  <AlignLeft className="w-4 h-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="center"
                  data-state={buttonAlignment === 'center' ? 'on' : 'off'}
                  className="flex-1 border data-[state=on]:border-primary"
                >
                  <AlignCenter className="w-4 h-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="justify"
                  data-state={buttonAlignment === 'justify' ? 'on' : 'off'}
                  className="flex-1 border data-[state=on]:border-primary"
                >
                  <AlignJustify className="w-4 h-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="right"
                  data-state={buttonAlignment === 'right' ? 'on' : 'off'}
                  className="flex-1 border data-[state=on]:border-primary"
                >
                  <AlignRight className="w-4 h-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="design" className="py-2 px-4"></TabsContent>
      </Tabs>
    </div>
  );
}
