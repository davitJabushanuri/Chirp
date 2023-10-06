import styles from "./styles/auth-button.module.scss";

export const AuthButton = ({
  onClick,
  icon,
  text,
}: {
  onClick?: () => void;
  icon?: React.ReactNode;
  text: string;
}) => {
  return (
    <button onClick={onClick} className={styles.container}>
      {icon && icon}
      {text}
    </button>
  );
};
