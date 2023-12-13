import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useEditorFormStore } from '@/store/editor-form-store';
import React from 'react';

interface FormMetaDataProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function FormMetaData({ className }: FormMetaDataProps) {
  const { formTitle, formDescription } = useEditorFormStore((state) => state);

  return (
    <Card className={cn(className, 'max-w-xl mx-auto')}>
      <CardHeader className="space-y-2">
        <CardTitle>{formTitle}</CardTitle>
        <CardDescription>{formDescription}</CardDescription>
      </CardHeader>
    </Card>
  );
}
