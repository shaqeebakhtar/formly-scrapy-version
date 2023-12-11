import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type EmailProps = {
  item: {
    fieldId: string;
    fieldQuestion: string;
    fieldType: string;
  };
};

export default function Email({ item }: EmailProps) {
  return (
    <div className="space-y-2 w-full">
      <Label>{item.fieldQuestion}</Label>
      <Input type="email" />
    </div>
  );
}
