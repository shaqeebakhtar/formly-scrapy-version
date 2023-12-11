import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type DropdownProps = {
  item: {
    fieldId: string;
    fieldQuestion: string;
    fieldType: string;
  };
};

export default function Dropdown({ item }: DropdownProps) {
  return (
    <div className="space-y-2 w-full">
      <Label>{item.fieldQuestion}</Label>
      <Select>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option-one">Option 1</SelectItem>
          <SelectItem value="option-two">Option 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
