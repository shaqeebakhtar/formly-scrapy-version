import { create } from "zustand";

type Actions = {
  workspaces: any;
  updateWorkspaces: (data: any) => void;
};

export const useWorkspaces = create<Actions>()((set) => ({
  workspaces: null,
  updateWorkspaces: (data) => set((state) => ({ workspaces: data })),
}));
