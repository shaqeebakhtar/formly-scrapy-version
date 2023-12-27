import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useSelectedField } from '@/store/selected-field';
import { useFormFields } from '@/store/form-fields';

type LongTextSettingsProps = {};

export default function LongTextSettings({}: LongTextSettingsProps) {
  const {
    selectedField,
    setSelectedFieldQuestion,
    setSelectedFieldPlaceholder,
    setSelectedFieldRequired,
    setSelectedFieldRows,
  } = useSelectedField((state) => state);
  const { formFields, setFormFields } = useFormFields((state) => state);

  return (
    <div className="grid space-y-6 px-4 py-2">
      <div className="grid space-y-2">
        <Label htmlFor="question">Question</Label>
        <Input
          type="text"
          id="question"
          placeholder="Question"
          value={selectedField?.fieldQuestion}
          onChange={(e) => {
            setSelectedFieldQuestion(e.currentTarget.value);
            const newFormFields = formFields.map((field) => {
              if (selectedField?.fieldId === field.fieldId) {
                return { ...field, fieldQuestion: e.currentTarget.value };
              } else {
                return field;
              }
            });

            setFormFields(newFormFields);
          }}
        />
      </div>
      <div className="grid space-y-2">
        <Label htmlFor="placeholder">Placeholder</Label>
        <Input
          type="text"
          id="placeholder"
          value={selectedField?.placeholder || ''}
          onChange={(e) => {
            setSelectedFieldPlaceholder(e.currentTarget.value);
            const newFormFields = formFields.map((field) => {
              if (selectedField?.fieldId === field.fieldId) {
                return { ...field, placeholder: e.currentTarget.value };
              } else {
                return field;
              }
            });

            setFormFields(newFormFields);
          }}
        />
      </div>
      <div className="grid space-y-2">
        <Label htmlFor="rows">Rows</Label>
        <Input
          type="text"
          id="rows"
          placeholder="4"
          value={selectedField?.rows || ''}
          onChange={(e) => {
            setSelectedFieldRows(parseInt(e.currentTarget.value));
            const newFormFields = formFields.map((field) => {
              if (selectedField?.fieldId === field.fieldId) {
                return { ...field, rows: parseInt(e.currentTarget.value) };
              } else {
                return field;
              }
            });

            setFormFields(newFormFields);
          }}
        />
      </div>
      <div className="grid space-y-2">
        <Label htmlFor="min-chars">Min Characters</Label>
        <Input type="text" id="min-chars" />
      </div>
      <div className="grid space-y-2">
        <Label htmlFor="max-chars">Max Characters</Label>
        <Input type="text" id="max-chars" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="required">Required</Label>
        <Switch
          className="w-10 h-5"
          checked={selectedField?.required || false}
          onCheckedChange={(checked) => {
            setSelectedFieldRequired(checked);
            const newFormFields = formFields.map((field) => {
              if (selectedField?.fieldId === field.fieldId) {
                return { ...field, required: checked };
              } else {
                return field;
              }
            });

            setFormFields(newFormFields);
          }}
        />
      </div>
    </div>
  );
}
