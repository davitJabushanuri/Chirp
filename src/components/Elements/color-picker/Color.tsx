import { setCookie } from "cookies-next";

import { TickIcon } from "@/assets/tick-svg";
import { useColor } from "@/stores/useColor";

import styles from "./styles/color.module.scss";

interface IColor {
  color: string;
}

const Color = ({ color }: IColor) => {
  const currentColor = useColor((state) => state.color);
  const setColor = useColor((state) => state.setColor);

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
        setCookie("color", `color-${color}`);
        setColor(`color-${color}`);
      }}
    >
      <div className={styles.tick}>
        <TickIcon />
      </div>
    </button>
  );
};

export default Color;
