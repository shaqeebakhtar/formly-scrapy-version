import { Value } from '@prisma/client/runtime/library';
import { create } from 'zustand';

type UseAuthState = {
  user: {
    id: string;
    email: string | null;
  } | null;
};

type UseAuthAction = {
  setUser: (value: UseAuthState['user']) => void;
};

export const useAuth = create<UseAuthState & UseAuthAction>((set) => ({
  user: null,
  setUser: (value: UseAuthState['user']) => set({ user: value }),
}));
