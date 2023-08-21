import styles from "./styles/header.module.scss";

export const Header = ({ children }: { children: JSX.Element }) => {
  return <header className={styles.container}>{children}</header>;
};
