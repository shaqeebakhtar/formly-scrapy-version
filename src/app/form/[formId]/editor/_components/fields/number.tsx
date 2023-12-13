import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type NumberProps = {
  item: {
    fieldId: string;
    fieldQuestion: string;
    fieldType: string;
  };
};

export default function Number({ item }: NumberProps) {
  return (
    <div className="space-y-2 w-full">
      <Label>{item.fieldQuestion}</Label>
      <Input type="number" />
    </div>
  );
}
