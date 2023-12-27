import { create } from 'zustand';

type UseFormFieldsState = {
  formFields: {
    fieldId: string;
    fieldQuestion: string;
    fieldType: string;
  }[];
};

type UseFormFieldsAction = {
  setFormFields: (newItem: UseFormFieldsState['formFields']) => void;
};

export const useFormFields = create<UseFormFieldsState & UseFormFieldsAction>(
  (set) => ({
    formFields: [
      {
        fieldId: '1',
        fieldQuestion: 'Untitled Question',
        fieldType: 'shortText',
      },
    ],
    setFormFields: (fields) => set({ formFields: fields }),
  })
);
