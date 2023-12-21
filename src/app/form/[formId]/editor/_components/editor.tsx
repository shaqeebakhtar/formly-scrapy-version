'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useEditorFormStore } from '@/store/editor-form-store';
import { useFormFields } from '@/store/form-fields';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useListState } from '@mantine/hooks';
import React, { useEffect } from 'react';
import FormField from './form-field';
import FormMetaData from './form-meta-data';
import { useParams } from 'next/navigation';
import { trpc } from '@/utils/trpc';

interface EditorProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Editor({ className }: EditorProps) {
  const { formFields, setFormFields } = useFormFields((state) => state);

  const params = useParams();

  const formDetailsQuery = trpc.form.getFormDetails.useQuery({
    formId: params.formId as string,
  });

  useEffect(() => {
    if (formDetailsQuery.isSuccess && formDetailsQuery.data) {
      const formDetails = JSON.parse(formDetailsQuery.data);
      if (formDetails && formDetails.fields) setFormFields(formDetails?.fields);
    }
  }, [setFormFields, formDetailsQuery.data, formDetailsQuery.isSuccess]);

  const [state, handlers] = useListState(formFields);

  const { formSubmitText } = useEditorFormStore((state) => state);
  const { buttonAlignment } = useEditorFormStore((state) => state);

  useEffect(() => {
    setFormFields(state);
  }, [state, setFormFields]);

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
                  {formFields?.map((item, index) => (
                    <Draggable
                      key={item.fieldId}
                      index={index}
                      draggableId={item.fieldId}
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
