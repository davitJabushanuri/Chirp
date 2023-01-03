import create from "zustand";

interface IColor {
  color: string;
  setColor: (theme: string) => void;
}

// TODO: refactor this to get class from html before hydration
// const color = typeof window !== "undefined" ? getCookie("color") : "";

export const useColor = create<IColor>((set) => ({
  color: "",
  setColor: (color: string) =>
    set({
      color,
    }),
}));
