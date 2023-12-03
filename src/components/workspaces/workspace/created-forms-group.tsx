"use client";
import { useParams } from "next/navigation";
import CreatedForm from "./created-form";
import { trpc } from "@/utils/trpc";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

export default function CreateFormsGroup({}: Props) {
  const params = useParams();
  const workspaceByIdQuery = trpc.workspace.getWorkspaceById.useQuery({
    workspaceId: params.workspaceId as string,
  });

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {!workspaceByIdQuery.isLoading && workspaceByIdQuery.isSuccess ? (
        workspaceByIdQuery.data?.forms.map((form) => (
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
