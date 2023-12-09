'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
import { DraggableProvided } from '@hello-pangea/dnd';
import { UseListStateHandlers } from '@mantine/hooks';
import { Copy, GripVertical, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  provided: DraggableProvided;
  item: { position: number; mass: number; symbol: string; name: string };
  index: number;
  handlers: UseListStateHandlers<{
    position: number;
    mass: number;
    symbol: string;
    name: string;
  }>;
}

export default function FormField({
  className,
  provided,
  item,
  index,
  handlers,
}: FormFieldProps) {
  const [selected, setSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const temp = {
    position: 58,
    mass: 140.12,
    symbol: Math.random().toString(),
    name: 'Temp',
  };

  return (
    <HoverCard open={isOpen}>
      <HoverCardTrigger
        asChild
        onClick={() => {
          setSelected(!selected);
          setIsOpen(!isOpen);
        }}
      >
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={cn(
            className,
            'relative',
            selected && 'border border-primary'
          )}
        >
          <CardContent className="py-4 px-6 flex items-center">
            <div
              {...provided.dragHandleProps}
              className={cn(
                'absolute -left-6 opacity-0 pointer-events-none',
                selected && 'opacity-100 pointer-events-auto'
              )}
            >
              <GripVertical className="w-4 h-4 test-muted-foreground" />
            </div>
            <div>{item.name}</div>
          </CardContent>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent side="right" align="start" className="w-auto p-2">
        <div className="grid">
          <Button
            variant={'ghost'}
            className="text-muted-foreground py-1.5 px-2"
            onClick={() => {
              handlers.insert(index + 1, temp);
            }}
          >
            <PlusCircle className="w-5 h-5" />
          </Button>
          <Button
            variant={'ghost'}
            className="text-muted-foreground py-1.5 px-2"
            onClick={() => {
              let temp = { ...item, ['symbol']: Math.random().toString() };

              handlers.insert(index + 1, temp);
            }}
          >
            <Copy className="w-5 h-5" />
          </Button>
          <Button
            variant={'ghost'}
            className="text-destructive/80 hover:text-destructive hover:bg-destructive/10 py-1.5 px-2"
            onClick={() => {
              handlers.remove(index);
            }}
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
