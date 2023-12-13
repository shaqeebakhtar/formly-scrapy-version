import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import React from 'react';

type ShortTextSettingsProps = {};

export default function ShortTextSettings({}: ShortTextSettingsProps) {
  return (
    <div className="grid space-y-6 px-4 py-2">
      <div className="grid space-y-2">
        <Label htmlFor="question">Question</Label>
        <Input type="text" id="question" placeholder="Question" />
      </div>
      <div className="grid space-y-2">
        <Label htmlFor="placeholder">Placeholder</Label>
        <Input type="text" id="placeholder" />
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
        <Switch className="w-10 h-5" />
      </div>
    </div>
  );
}
