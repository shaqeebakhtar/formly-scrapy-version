'use client';
import { trpc } from '@/utils/trpc';
import { ResponsesDataTable } from './responses-data-table';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Icons } from '@/components/icons';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';

export default function Responses() {
  const params = useParams();
  const [responseData, setResponseData] = useState<any>([]);
  const [loadingColumns, setLoadingColumns] = useState(true);
  const [columns, setColumns] = useState<ColumnDef<any>[]>([]);

  const responsesQuery = trpc.form.getFormResponses.useQuery({
    formId: params.formId as string,
  });

  useEffect(() => {
    if (responsesQuery.isSuccess && responsesQuery.data) {
      setResponseData(JSON.parse(responsesQuery.data));
    }
  }, [responsesQuery.data, responsesQuery.isSuccess]);

  React.useEffect(() => {
    // update columns dynamically

    const newColumns: ColumnDef<any>[] = [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ];

    setLoadingColumns(true);

    for (const key in responseData[0]) {
      newColumns.push({
        accessorKey: key.toLowerCase(),
        header: key,
        cell: ({ row }) => {
          return <div>{row.original[key]}</div>;
        },
      });
    }

    setColumns(newColumns);

    setLoadingColumns(false);
  }, [responseData]);

  return (
    <div className="w-full h-full">
      <div className="p-4 mx-4 my-6 lg:mx-16">
        <div className="mx-auto p-12 bg-background shadow-sm rounded-xl">
          {responsesQuery.isLoading || loadingColumns ? (
            <div className="w-full grid place-items-center">
              <Icons.spinner className="animate-spin" />
            </div>
          ) : (
            <ResponsesDataTable data={responseData} columns={columns} />
          )}
        </div>
      </div>
    </div>
  );
}
