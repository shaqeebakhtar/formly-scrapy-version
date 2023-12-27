import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useFormFields } from '@/store/form-fields';
import { useSelectedField } from '@/store/selected-field';
import LongTextSettings from './long-text-settings';
import ShortTextSettings from './short-text-settings';
import EmailSettings from './email-settings';
import NumberSettings from './number-settings';
import MultiplechoiceSettings from './multiplechoice-settings';
import DropdownSettings from './dropdown-settings';

export default function FieldSettings() {
  const { selectedField, setSelectedFieldType } = useSelectedField(
    (state) => state
  );
  const { formFields, setFormFields } = useFormFields((state) => state);

  const fieldSettings = {
    shortText: <ShortTextSettings />,
    longText: <LongTextSettings />,
    multipleChoice: <MultiplechoiceSettings />,
    email: <EmailSettings />,
    dropdown: <DropdownSettings />,
    number: <NumberSettings />,
  };

  return (
    <>
      <div className="grid space-y-6 px-4 py-2">
        <div className="grid space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            value={selectedField?.fieldType}
            onValueChange={(newType) => {
              setSelectedFieldType(newType);
              const newFormFields = formFields.map((field) => {
                if (selectedField?.fieldId === field.fieldId) {
                  return { ...field, fieldType: newType };
                } else {
                  return field;
                }
              });

              setFormFields(newFormFields);
            }}
          >
            <SelectTrigger id="type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="dropdown">Dropdown</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="longText">Long Text</SelectItem>
                <SelectItem value="multipleChoice">Multiple Choice</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="shortText">Short Text</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Separator className="my-4" />
      {fieldSettings[selectedField?.fieldType as keyof typeof fieldSettings]}
    </>
  );
}
