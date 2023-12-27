import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

type LiveFormHeaderProps = {
  formTitle: string;
  formDescription: string;
};

export default function LiveFormHeader({
  formTitle,
  formDescription,
}: LiveFormHeaderProps) {
  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader className="space-y-2">
        <CardTitle>{formTitle}</CardTitle>
        <CardDescription>{formDescription}</CardDescription>
      </CardHeader>
    </Card>
  );
}
