'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';
import { useSelectedField } from '@/store/selected-field';
import { DraggableProvided } from '@hello-pangea/dnd';
import { UseListStateHandlers } from '@mantine/hooks';
import { Copy, GripVertical, PlusCircle, Trash2 } from 'lucide-react';
import FormFieldType from './form-field-type';

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  provided: DraggableProvided;
  item: {
    fieldId: string;
    fieldQuestion: string;
    fieldType: string;
    required?: boolean;
    placeholder?: string;
    rows?: number;
    minChars?: number;
    maxChars?: number;
    options?: string[];
  };
  index: number;
  handlers: UseListStateHandlers<{
    fieldId: string;
    fieldQuestion: string;
    fieldType: string;
  }>;
}

export default function FormField({
  className,
  provided,
  item,
  index,
  handlers,
}: FormFieldProps) {
  const temp = {
    fieldId: Math.random().toString(),
    fieldQuestion: 'Untitled Question - Add',
    fieldType: 'shortText',
  };

  const { selectedField, setSelectedField } = useSelectedField(
    (state) => state
  );

  return (
    <HoverCard open={item.fieldId === selectedField?.fieldId}>
      <div
        tabIndex={0}
        // onBlur={({ currentTarget, relatedTarget }) => {
        //   if (currentTarget.contains(relatedTarget)) return;
        //   setSelectedField(null);
        // }}
      >
        <HoverCardTrigger asChild>
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            onClick={() => {
              setSelectedField(item);
            }}
            className={cn(
              className,
              'relative hover:border hover:border-primary',
              item.fieldId === selectedField?.fieldId && 'border border-primary'
            )}
          >
            <CardContent className="py-4 px-6 flex items-center">
              <div
                {...provided.dragHandleProps}
                className={cn(
                  'absolute -left-6 opacity-0 pointer-events-none',
                  item.fieldId === selectedField?.fieldId &&
                    'opacity-100 pointer-events-auto'
                )}
              >
                <GripVertical className="w-4 h-4 test-muted-foreground" />
              </div>
              <FormFieldType fieldType={item.fieldType} item={item} />
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
                let temp = { ...item, ['fieldId']: Math.random().toString() };
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
      </div>
    </HoverCard>
  );
}
