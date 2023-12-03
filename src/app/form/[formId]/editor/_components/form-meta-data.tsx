import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

interface FormMetaDataProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function FormMetaData({ className }: FormMetaDataProps) {
  return (
    <Card className={cn(className, "max-w-xl mx-auto")}>
      <CardHeader>
        <CardTitle>Demo Form</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
    </Card>
  );
}
