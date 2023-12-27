'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useEditorFormStore } from '@/store/editor-form-store';
import { useFormFields } from '@/store/form-fields';
import React from 'react';
import FormMetaData from '../../editor/_components/form-meta-data';
import PreviewFormField from './preview-form-field';

interface PreviewProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Preview({ className }: PreviewProps) {
  const { formFields } = useFormFields((state) => state);
  const { formSubmitText } = useEditorFormStore((state) => state);
  const { buttonAlignment } = useEditorFormStore((state) => state);

  console.log(formFields);

  return (
    <ScrollArea className={cn('w-full h-[calc(100vh-64px)]', className)}>
      <div className="p-4 mx-4 my-6 lg:mx-8">
        <FormMetaData className="mb-4" />
        <div className="space-y-3 max-w-xl mx-auto">
          {formFields.map((field, idx) => (
            <PreviewFormField key={idx} field={field} />
          ))}
        </div>
        <Card
          className={cn(
            'mt-4 max-w-xl mx-auto bg-transparent border-none shadow-none',
            `text-${buttonAlignment}`
          )}
        >
          <CardContent className="p-0">
            <Button className={cn(buttonAlignment === 'justify' && 'w-full')}>
              {formSubmitText}
            </Button>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
