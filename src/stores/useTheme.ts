import create from "zustand";
import { persist } from "zustand/middleware";

interface ITheme {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useTheme = create(
  persist<ITheme>(
    (set) => ({
      theme: "theme-dim",
      setTheme: (theme: string) =>
        set({
          theme,
        }),
    }),
    {
      name: "theme",
      getStorage: () => localStorage,
    },
  ),
);
