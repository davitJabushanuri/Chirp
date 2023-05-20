import { create } from "zustand";

interface ITheme {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useTheme = create<ITheme>((set) => ({
  theme: "",
  setTheme: (theme: string) =>
    set({
      theme,
    }),
}));
