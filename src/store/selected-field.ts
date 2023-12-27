import { create } from 'zustand';

type SelectedFieldAction = {
  setSelectedField: (value: SelectedFieldState['selectedField']) => void;
  setSelectedFieldType: (type: string) => void;
};

type SelectedFieldState = {
  selectedField: {
    fieldId: string;
    fieldQuestion: string;
    fieldType: string;
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
}));
