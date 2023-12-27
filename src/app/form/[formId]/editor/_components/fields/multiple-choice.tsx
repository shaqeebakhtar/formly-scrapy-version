import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React from 'react';

type MultipleChoiceProps = {
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

export default function MultipleChoice({ item }: MultipleChoiceProps) {
  return (
    <div className="space-y-4 w-full">
      <Label>{item.fieldQuestion}</Label>
      <RadioGroup defaultValue="option-one" className="space-y-2">
        {(item.options || ['Option 1', 'Option 2'])?.map((option, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={option} />
            <Label htmlFor={option}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
