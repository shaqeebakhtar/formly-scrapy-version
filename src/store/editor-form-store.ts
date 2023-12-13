import { create } from 'zustand';

type EditorFormState = {
  formTitle: string;
  formDescription: string;
  formSubmitText: string;
  buttonAlignment: string;
};

type EditorFormAction = {
  setFormTitle: (value: EditorFormState['formTitle']) => void;
  setFormDescription: (value: EditorFormState['formDescription']) => void;
  setFormSubmitText: (value: EditorFormState['formSubmitText']) => void;
  setButtonAlignment: (value: EditorFormState['buttonAlignment']) => void;
};

export const useEditorFormStore = create<EditorFormState & EditorFormAction>(
  (set) => ({
    formTitle: 'Demo Form',
    formDescription: 'Demo Description',
    formSubmitText: 'Submit',
    buttonAlignment: 'right',
    setFormTitle: (value: string) => set({ formTitle: value }),
    setFormDescription: (value: string) => set({ formDescription: value }),
    setFormSubmitText: (value: string) => set({ formSubmitText: value }),
    setButtonAlignment: (value: string) => set({ buttonAlignment: value }),
  })
);
