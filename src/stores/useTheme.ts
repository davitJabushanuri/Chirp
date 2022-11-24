import create from "zustand";
import { persist } from "zustand/middleware";

interface IThemeStore {
  theme: string | null;
  setTheme: (theme: string) => void;
}

export const useTheme = create(
  persist<IThemeStore>(
    (set) => ({
      theme:
        typeof window !== undefined
          ? localStorage.getItem("theme")
          : "theme-dark",
      setTheme: (theme: string) =>
        set({
          theme,
        }),
    }),
    {
      name: "theme",
    },
  ),
);
