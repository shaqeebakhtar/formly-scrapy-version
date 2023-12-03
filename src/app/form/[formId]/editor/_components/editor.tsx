"use client";
import { cn } from "@/lib/utils";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useListState } from "@mantine/hooks";
import React from "react";
import FormField from "./form-field";
import FormMetaData from "./form-meta-data";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EditorProps extends React.HTMLAttributes<HTMLDivElement> {}

const data = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];

export default function Editor({ className }: EditorProps) {
  const [state, handlers] = useListState(data);

  const items = state.map((item, index) => (
    <Draggable key={item.symbol} index={index} draggableId={item.symbol}>
      {(provided) => <FormField provided={provided} />}
    </Draggable>
  ));

  return (
    <ScrollArea className={cn("w-full h-[calc(100vh-64px)]", className)}>
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
              <div
                className="grid gap-3 max-w-xl mx-auto"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {items}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </ScrollArea>
  );
}
