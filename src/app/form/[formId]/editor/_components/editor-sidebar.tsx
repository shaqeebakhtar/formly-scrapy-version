'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FormSettings from './sidebar-settings/form-settings';
import { useSelectedField } from '@/store/selected-field';
import FieldSettings from './sidebar-settings/field-settings';

interface EditorSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function EditorSidebar({ className }: EditorSidebarProps) {
  const { selectedField } = useSelectedField((state) => state);

  return (
    <div className={cn('border-l border-border bg-white w-96', className)}>
      <Tabs defaultValue="question" className="w-full">
        <TabsList className="w-full h-12 rounded-none p-0 border-b bg-background">
          <TabsTrigger
            value="question"
            className="w-full h-full rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none  data-[state=active]:font-semibold"
          >
            {selectedField ? 'Question' : 'Form'}
          </TabsTrigger>
          <TabsTrigger
            value="design"
            className="w-full h-full rounded-none border-b-2 border-transparent data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-semibold"
            disabled
          >
            Design
          </TabsTrigger>
        </TabsList>
        <TabsContent value="question" className="py-2">
          {selectedField ? <FieldSettings /> : <FormSettings />}
        </TabsContent>
        <TabsContent value="design" className="py-2 px-4"></TabsContent>
      </Tabs>
    </div>
  );
}
