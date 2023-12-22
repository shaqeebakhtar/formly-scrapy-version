'use client';

import { trpc } from '@/utils/trpc';
import { useParams } from 'next/navigation';
import LiveFormHeader from './_components/live-form-header';
import LiveFormMain from './_components/live-form-main';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

type LiveFormProps = {};

type formField = {
  buttonAlignment: string;
  formDescription: string;
  formSubmitText: string;
  formTitle: string;
  fields: {
    fieldId: string;
    fieldQuestion: string;
    fieldType: string;
    required?: boolean;
    placeholder?: string;
    rows?: number;
    minChars?: number;
    maxChars?: number;
    options?: string[];
  }[];
};

export default function LiveForm({}: LiveFormProps) {
  const params = useParams();
  const [formDetails, setFormDetails] = useState<formField | null>();

  const formDetailsQuery = trpc.form.getFormDetails.useQuery({
    formId: params.formId as string,
  });

  useEffect(() => {
    if (formDetailsQuery.isSuccess)
      setFormDetails(JSON.parse(formDetailsQuery.data));
  }, [formDetailsQuery.data, formDetailsQuery.isSuccess]);

  return (
    <div className="bg-slate-50/50 h-full">
      <div className="p-4 mx-4 py-12 lg:mx-8">
        {!formDetailsQuery.isLoading && formDetailsQuery.isSuccess ? (
          <>
            <LiveFormHeader
              formTitle={formDetails?.formTitle!}
              formDescription={formDetails?.formDescription!}
            />
            <LiveFormMain
              formId={params.formId as string}
              formFields={formDetails?.fields!}
              buttonAlignment={formDetails?.buttonAlignment}
              formSubmitText={formDetails?.formSubmitText}
            />
          </>
        ) : (
          <div className="max-w-xl mx-auto space-y-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-10" />
          </div>
        )}
      </div>
    </div>
  );
}
