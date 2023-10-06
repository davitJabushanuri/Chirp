import styles from "./styles/close-button.module.scss";

export const CloseButton = ({
  onClick,
  ariaLabel,
  title,
  children,
}: {
  onClick: () => void;
  ariaLabel: string;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <button
      aria-label={ariaLabel}
      data-title={title}
      onClick={onClick}
      className={styles.container}
    >
      {children}
    </button>
  );
};
