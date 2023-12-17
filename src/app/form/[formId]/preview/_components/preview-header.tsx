'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface PreviewHeaderProps extends React.AllHTMLAttributes<HTMLDivElement> {}

export default function PreviewHeader({ className }: PreviewHeaderProps) {
  const router = useRouter();

  return (
    <div
      className={cn(
        'flex items-center justify-between border-b border-border px-4 py-3 lg:px-8 bg-white',
        className
      )}
    >
      <div className="flex space-x-2 text-sm">
        <Link href={`/workspaces`} className="text-muted-foreground">
          Demo Workspace
        </Link>
        <span className="text-muted-foreground">/</span>
        <p className="font-medium">New Form</p>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant={'outline'} onClick={() => router.push('editor')}>
          <X className="w-5 h-5 mr-2" />
          Close Preview
        </Button>
      </div>
    </div>
  );
}
