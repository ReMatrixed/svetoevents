import { create } from "zustand";

interface SearchModalState {
  opened: boolean;
  setState: (opened: boolean) => void;
}

export const useSearchModalStore = create<SearchModalState>()(
  (set) => ({
    opened: false,
    setState: (opened) => set({ opened }),
  })
);
