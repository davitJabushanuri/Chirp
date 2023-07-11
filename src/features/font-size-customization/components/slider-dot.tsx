import styles from "./styles/slider-dot.module.scss";

export const SliderDot = ({
  value,
  fontSize,
  title,
  onClick,
}: {
  value: number;
  fontSize: number;
  title?: string;
  onClick: (font: number) => void;
}) => {
  return (
    <button
      title={title}
      aria-hidden="true"
      className={styles.container}
      onClick={() => onClick(value)}
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
