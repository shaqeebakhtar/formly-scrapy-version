import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Trash2 } from 'lucide-react';
import React from 'react';

type MultiplechoiceSettingsProps = {};

export default function MultiplechoiceSettings({}: MultiplechoiceSettingsProps) {
  return (
    <div className="grid space-y-6 px-4 py-2">
      <div className="grid space-y-2">
        <Label htmlFor="question">Question</Label>
        <Input type="text" id="question" placeholder="Question" />
      </div>
      <div className="grid space-y-3">
        <Label>Options</Label>
        <div className="grid space-y-2">
          <div className="flex space-x-1">
            <Input type="text" placeholder="Option 1" />
            <Button className="px-3" variant={'ghost'}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
          <div className="flex space-x-1">
            <Input type="text" placeholder="Option 2" />
            <Button className="px-3" variant={'ghost'}>
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        </div>
        <Button className="w-fit px-0" variant={'link'}>
          Add option
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="required">Required</Label>
        <Switch className="w-10 h-5" id="required" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="multiple-select">Select Multiple</Label>
        <Switch className="w-10 h-5" id="multiple-select" />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="type-checkbox">Checkbox Type</Label>
        <Switch className="w-10 h-5" id="type-checkbox" />
      </div>
    </div>
  );
}
