import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

type LongTextProps = {
  item: {
    fieldId: string;
    fieldQuestion: string;
    fieldType: string;
    required?: boolean;
    placeholder?: string;
    rows?: number;
    minChars?: number;
    maxChars?: number;
    options?: string[];
  };
};

export default function LongText({ item }: LongTextProps) {
  return (
    <div className="space-y-2 w-full">
      <Label>{item.fieldQuestion}</Label>
      <Textarea placeholder={item.placeholder} rows={item.rows || 4} />
    </div>
  );
}
