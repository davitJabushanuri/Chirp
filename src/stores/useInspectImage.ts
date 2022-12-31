import create from "zustand";

interface IInspectImage {
  isInspectModalOpen: boolean;
  source: string | undefined;
  sourceType: string | undefined;
  openInspectModal: () => void;
  closeInspectModal: () => void;
  setSource: (source: string) => void;
  setSourceType: (sourceType: string) => void;
}

export const useInspectImage = create<IInspectImage>((set) => ({
  isInspectModalOpen: false,
  source: "",
  sourceType: "",
  openInspectModal: () => set({ isInspectModalOpen: true }),
  closeInspectModal: () => set({ isInspectModalOpen: false }),
  setSource: (source: string) => set({ source }),
  setSourceType: (sourceType: string) => set({ sourceType }),
}));
