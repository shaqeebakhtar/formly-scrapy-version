import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useEditorFormStore } from '@/store/editor-form-store';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react';

export default function FormSettings() {
  const { formTitle, setFormTitle } = useEditorFormStore((state) => state);
  const { formDescription, setFormDescription } = useEditorFormStore(
    (state) => state
  );
  const { formSubmitText, setFormSubmitText } = useEditorFormStore(
    (state) => state
  );
  const { buttonAlignment, setButtonAlignment } = useEditorFormStore(
    (state) => state
  );

  return (
    <>
      <div className="grid space-y-6 px-4 py-2">
        <div className="grid space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Feedback"
            value={formTitle}
            onChange={(e) => setFormTitle(e.currentTarget.value)}
          />
        </div>
        <div className="grid space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formDescription}
            onChange={(e) => setFormDescription(e.currentTarget.value)}
            placeholder="Please share your feedback"
          />
        </div>
      </div>
      <Separator className="my-4" />
      <div className="grid space-y-6 px-4 py-2">
        <div className="grid space-y-2">
          <Label htmlFor="buttonText">Button Text</Label>
          <Input
            id="buttonText"
            placeholder="Submit"
            value={formSubmitText}
            onChange={(e) => setFormSubmitText(e.currentTarget.value)}
          />
        </div>
        <div className="grid space-y-2">
          <Label>Button Alignment</Label>
          <ToggleGroup
            type="single"
            value={buttonAlignment}
            onValueChange={(value) => {
              if (value) setButtonAlignment(value);
            }}
          >
            <ToggleGroupItem
              value="left"
              data-state={buttonAlignment === 'left' ? 'on' : 'off'}
              className="flex-1 border data-[state=on]:border-primary"
            >
              <AlignLeft className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="center"
              data-state={buttonAlignment === 'center' ? 'on' : 'off'}
              className="flex-1 border data-[state=on]:border-primary"
            >
              <AlignCenter className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="justify"
              data-state={buttonAlignment === 'justify' ? 'on' : 'off'}
              className="flex-1 border data-[state=on]:border-primary"
            >
              <AlignJustify className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="right"
              data-state={buttonAlignment === 'right' ? 'on' : 'off'}
              className="flex-1 border data-[state=on]:border-primary"
            >
              <AlignRight className="w-4 h-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </>
  );
}
