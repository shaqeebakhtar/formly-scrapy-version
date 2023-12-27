'use client';
import { useParams } from 'next/navigation';
import CreatedForm from './created-form';
import { trpc } from '@/utils/trpc';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { Prisma } from '@prisma/client';

type Props = {};

export default function CreateFormsGroup({}: Props) {
  const [forms, setForms] = useState<
    {
      id: string;
      formName: string;
      formType: string | null;
      formFields: Prisma.JsonValue;
      workspaceId: string;
      createdAt: string;
      updatedAt: string;
    }[]
  >([]);
  const params = useParams();
  const workspaceByIdQuery = trpc.workspace.getWorkspaceById.useQuery({
    workspaceId: params.workspaceId as string,
  });

  useEffect(() => {
    if (!workspaceByIdQuery.isLoading && workspaceByIdQuery.isSuccess) {
      setForms(JSON.parse(workspaceByIdQuery.data)?.forms);
    }
  }, [
    workspaceByIdQuery.data,
    workspaceByIdQuery.isLoading,
    workspaceByIdQuery.isSuccess,
  ]);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {!workspaceByIdQuery.isLoading && workspaceByIdQuery.isSuccess ? (
        forms.map((form) => (
          <CreatedForm
            key={form.id}
            form={form}
            workspaceId={params.workspaceId as string}
          />
        ))
      ) : (
        <>
          {Array.from({ length: 15 }, (_, index) => (
            <Skeleton className="h-24" key={index} />
          ))}
        </>
      )}
    </div>
  );
}
