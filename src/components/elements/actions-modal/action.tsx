import styles from "./styles/action.module.scss";

export const Action = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => {
  return (
    <span className={styles.container}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.text}>{text}</span>
    </span>
  );
};
