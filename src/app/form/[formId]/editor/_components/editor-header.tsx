import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface EditorHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function EditorHeader({ className }: EditorHeaderProps) {
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

      <div className="space-x-2 text-sm text-muted-foreground">
        <Link
          href={'create'}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'bg-primary/10 text-primary font-semibold'
          )}
        >
          Editor
        </Link>
        <Link
          href={'responses'}
          className={cn(buttonVariants({ variant: 'ghost' }))}
        >
          Responses
        </Link>
        <Link
          href={'settings'}
          className={cn(buttonVariants({ variant: 'ghost' }))}
        >
          Settings
        </Link>
      </div>

      <div className="flex items-center space-x-3">
        <Link
          href={'preview'}
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <Eye className="w-5 h-5 mr-2 text-muted-foreground" />
          Preview
        </Link>
        <Button>Publish</Button>
      </div>
    </div>
  );
}
