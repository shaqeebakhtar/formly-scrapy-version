'use client';
import { cn } from '@/lib/utils';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useListState } from '@mantine/hooks';
import React, { useState } from 'react';
import FormField from './form-field';
import FormMetaData from './form-meta-data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEditorFormStore } from '@/store/editor-form-store';

interface EditorProps extends React.HTMLAttributes<HTMLDivElement> {}

// const data = ;

export default function Editor({ className }: EditorProps) {
  const [data, setData] = useState([
    { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
  ]);
  const [state, handlers] = useListState(data);

  const { formSubmitText } = useEditorFormStore((state) => state);
  const { buttonAlignment } = useEditorFormStore((state) => state);

  return (
    <ScrollArea className={cn('w-full h-[calc(100vh-64px)]', className)}>
      <div className="p-4 mx-4 my-6 lg:mx-8">
        <FormMetaData className="mb-4" />
        <DragDropContext
          onDragEnd={({ destination, source }) =>
            handlers.reorder({
              from: source.index,
              to: destination?.index || 0,
            })
          }
        >
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <>
                <div
                  className="grid gap-3 max-w-xl mx-auto"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {state.map((item, index) => (
                    <Draggable
                      key={item.symbol}
                      index={index}
                      draggableId={item.symbol}
                    >
                      {(provided) => (
                        <FormField
                          provided={provided}
                          item={item}
                          handlers={handlers}
                          index={index}
                        />
                      )}
                    </Draggable>
                  ))}
                </div>
              </>
            )}
          </Droppable>
        </DragDropContext>
        <Card
          className={cn(
            'mt-4 max-w-xl mx-auto bg-transparent border-none shadow-none',
            `text-${buttonAlignment}`
          )}
        >
          <CardContent className="p-0">
            <Button className={cn(buttonAlignment === 'justify' && 'w-full')}>
              {formSubmitText}
            </Button>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
