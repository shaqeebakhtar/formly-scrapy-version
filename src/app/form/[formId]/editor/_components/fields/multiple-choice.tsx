import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type MultipleChoiceProps = {
  item: {
    fieldId: string;
    fieldQuestion: string;
    fieldType: string;
  };
};

export default function MultipleChoice({ item }: MultipleChoiceProps) {
  return (
    <div className="space-y-4 w-full">
      <Label>{item.fieldQuestion}</Label>
      <RadioGroup defaultValue="option-one" className="space-y-2">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Option 2</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
