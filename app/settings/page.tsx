"use client";
import { useTheme } from "@/stores/useTheme";

const Settings = () => {
  const setTheme = useTheme((state) => state.setTheme);

  return (
    <div>
      <h1>Settings</h1>

      <button onClick={() => setTheme("theme-light")}>Light</button>
      <br />
      <button onClick={() => setTheme("theme-dark")}>dark</button>
      <br />
      <button onClick={() => setTheme("theme-dim")}>dim</button>
    </div>
  );
};

export default Settings;
