import { create } from "zustand";

interface ISearchStore {
  query: string;
  setQuery: (query: string) => void;
  isResultsModalOpen: boolean;
  openResultsModal: () => void;
  closeResultsModal: () => void;
}

export const useSearchStore = create<ISearchStore>((set) => ({
  query: "",
  setQuery: (query: string) => set({ query }),
  isResultsModalOpen: false,
  openResultsModal: () => set({ isResultsModalOpen: true }),
  closeResultsModal: () => set({ isResultsModalOpen: false }),
}));
