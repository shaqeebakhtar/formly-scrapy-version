import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

type LongTextProps = {
  item: {
    fieldId: string;
    fieldQuestion: string;
    fieldType: string;
  };
};

export default function LongText({ item }: LongTextProps) {
  return (
    <div className="space-y-2 w-full">
      <Label>{item.fieldQuestion}</Label>
      <Textarea />
    </div>
  );
}
