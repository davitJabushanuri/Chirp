import styles from "./styles/slider-dot.module.scss";

export const SliderDot = ({
  value,
  fontSize,
  setFontSize,
  title,
}: {
  value: number;
  fontSize: number;
  setFontSize: (value: number) => void;
  title?: string;
}) => {
  return (
    <button
      title={title}
      aria-hidden="true"
      className={styles.container}
      onClick={() => setFontSize(value)}
      tabIndex={-1}
    >
      <span
        className={
          fontSize >= value ? styles.primaryColor : styles.secondaryColor
        }
      ></span>
    </button>
  );
};
