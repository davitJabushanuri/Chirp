import { CookieValueTypes, getCookie } from "cookies-next";
import create from "zustand";

interface ITheme {
  theme: string | CookieValueTypes;
  setTheme: (theme: string) => void;
}

// const initialValue = getCookie("theme");

export const useTheme = create<ITheme>((set) => ({
  theme: "theme-dim",
  setTheme: (theme: string) =>
    set({
      theme,
    }),
}));
