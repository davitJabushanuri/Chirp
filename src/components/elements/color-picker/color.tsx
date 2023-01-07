"use client";

import { setCookie } from "cookies-next";
import { useEffect } from "react";

import { TickIcon } from "@/assets/tick-svg";
import { useColor } from "@/stores/use-color";

import styles from "./styles/color.module.scss";

interface IColor {
  activeColor: string | undefined;
  color: string;
}

const Color = ({ activeColor, color }: IColor) => {
  const currentColor = useColor((state) => state.color);
  const setColor = useColor((state) => state.setColor);

  useEffect(() => {
    setColor(activeColor || "color-blue");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      id={
        color === "blue"
          ? styles.blue
          : color === "yellow"
          ? styles.yellow
          : color === "rose"
          ? styles.rose
          : color === "violet"
          ? styles.violet
          : color === "orange"
          ? styles.orange
          : color === "green"
          ? styles.green
          : ""
      }
      className={`${styles.container} ${
        `color-${color}` === currentColor ? styles.active : ""
      }`}
      onClick={() => {
        setColor(`color-${color}`);
        setCookie("color", `color-${color}`, {
          maxAge: 60 * 60 * 24 * 365,
        });
      }}
    >
      <div className={styles.tick}>
        <TickIcon />
      </div>
    </button>
  );
};

export default Color;
