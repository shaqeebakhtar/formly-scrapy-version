import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import FormFieldType from '../../editor/_components/form-field-type';

type PreviewFormFieldProps = {
  field: { fieldId: string; fieldQuestion: string; fieldType: string };
};

export default function PreviewFormField({ field }: PreviewFormFieldProps) {
  return (
    <Card>
      <CardContent className="py-4 px-6 flex items-center">
        <FormFieldType fieldType={field.fieldType} item={field} />
      </CardContent>
    </Card>
  );
}
