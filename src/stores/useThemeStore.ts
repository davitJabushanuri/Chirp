import { CookieValueTypes, getCookie } from "cookies-next";
import create from "zustand";

interface IThemeStore {
  theme: string | CookieValueTypes;
  setTheme: (theme: string) => void;
}

const initialValue = getCookie("theme");

export const useThemeStore = create<IThemeStore>((set) => ({
  theme: "theme-dark",
  setTheme: (theme: string) =>
    set({
      theme,
    }),
}));
