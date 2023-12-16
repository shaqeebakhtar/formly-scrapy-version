import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Trash2 } from 'lucide-react';
import { useFormFields } from '@/store/form-fields';
import { useSelectedField } from '@/store/selected-field';
import React from 'react';

type DropdownSettingsProps = {};

export default function DropdownSettings({}: DropdownSettingsProps) {
  const {
    selectedField,
    setSelectedFieldQuestion,
    setSelectedFieldPlaceholder,
    setSelectedFieldRequired,
    setSelectedFieldOptions,
  } = useSelectedField((state) => state);
  const { formFields, setFormFields } = useFormFields((state) => state);

  const [options, setOptions] = React.useState<string[]>(
    selectedField?.options || ['Option 1', 'Option 2']
  );

  return (
    <div className="grid space-y-6 px-4 py-2">
      <div className="grid space-y-2">
        <Label htmlFor="question">Question</Label>
        <Input
          type="text"
          id="question"
          placeholder="Question"
          value={selectedField?.fieldQuestion || ''}
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
      <div className="grid space-y-3">
        <Label>Options</Label>
        <div className="grid space-y-2">
          {options.map((option, idx) => (
            <div key={idx} className="flex space-x-1">
              <Input
                type="text"
                value={option}
                onChange={(e) => {
                  let temp = [...options];
                  temp[idx] = e.currentTarget.value;
                  setOptions(temp);
                  setSelectedFieldOptions(temp);
                }}
                onBlur={() => {
                  const newFormFields = formFields.map((field) => {
                    if (selectedField?.fieldId === field.fieldId) {
                      return { ...field, options };
                    } else {
                      return field;
                    }
                  });

                  setFormFields(newFormFields);
                }}
                placeholder={`Option ${idx + 1}`}
              />
              <Button
                onClick={() => {
                  if (options.length > 2) {
                    const temp = options.filter((_, index) => index !== idx);
                    setOptions(temp);

                    setSelectedFieldOptions(temp);

                    const newFormFields = formFields.map((field) => {
                      if (selectedField?.fieldId === field.fieldId) {
                        return { ...field, options: temp };
                      } else {
                        return field;
                      }
                    });

                    setFormFields(newFormFields);
                  }
                }}
                className="px-3"
                variant={'ghost'}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          className="w-fit px-0"
          variant={'link'}
          onClick={() => {
            setOptions((prev) => [...prev, '']);
            setSelectedFieldOptions(options);
          }}
        >
          Add option
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="required">Required</Label>
        <Switch
          className="w-10 h-5"
          id="required"
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
