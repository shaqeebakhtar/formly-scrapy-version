import { create } from 'zustand';

type SelectedFieldAction = {
  setSelectedField: (value: SelectedFieldState['selectedField']) => void;
  setSelectedFieldType: (type: string) => void;
  setSelectedFieldQuestion: (question: string) => void;
  setSelectedFieldPlaceholder: (placeholder: string) => void;
  setSelectedFieldRequired: (required: boolean) => void;
  setSelectedFieldRows: (rows: number) => void;
  setSelectedFieldOptions: (options: string[]) => void;
};

type SelectedFieldState = {
  selectedField: {
    fieldId: string;
    fieldQuestion: string;
    fieldType: string;
    required?: boolean;
    placeholder?: string;
    rows?: number;
    minChars?: number;
    maxChars?: number;
    options?: string[];
  } | null;
};

export const useSelectedField = create<
  SelectedFieldState & SelectedFieldAction
>((set) => ({
  selectedField: {
    fieldId: '1',
    fieldQuestion: 'Untitled Question',
    fieldType: 'shortText',
  },

  setSelectedField: (value: SelectedFieldState['selectedField']) =>
    set({ selectedField: value }),

  setSelectedFieldType: (type: string) =>
    set((state) => ({
      selectedField: {
        ...state.selectedField!,
        fieldType: type,
      },
    })),

  setSelectedFieldQuestion: (question: string) =>
    set((state) => ({
      selectedField: {
        ...state.selectedField!,
        fieldQuestion: question,
      },
    })),

  setSelectedFieldPlaceholder: (placeholder: string) =>
    set((state) => ({
      selectedField: {
        ...state.selectedField!,
        placeholder,
      },
    })),

  setSelectedFieldRequired: (required: boolean) =>
    set((state) => ({
      selectedField: {
        ...state.selectedField!,
        required,
      },
    })),

  setSelectedFieldRows: (rows: number) =>
    set((state) => ({
      selectedField: {
        ...state.selectedField!,
        rows,
      },
    })),

  setSelectedFieldOptions: (options: string[]) =>
    set((state) => ({
      selectedField: {
        ...state.selectedField!,
        options,
      },
    })),
}));
