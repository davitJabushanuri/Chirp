import { Tick } from "@/assets/tick";
import { useColor } from "@/stores/useColor";

import styles from "./Color.module.scss";

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
      onClick={() => setColor(`color-${color}`)}
    >
      <div className={styles.tick}>
        <Tick />
      </div>
    </button>
  );
};

export default Color;
