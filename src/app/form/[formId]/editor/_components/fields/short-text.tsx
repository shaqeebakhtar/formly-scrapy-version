import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ShortTextProps = {
  item: {
    fieldId: string;
    fieldQuestion: string;
    fieldType: string;
  };
};

export default function ShortText({ item }: ShortTextProps) {
  return (
    <div className="space-y-2 w-full">
      <Label>{item.fieldQuestion}</Label>
      <Input type="text" />
    </div>
  );
}
