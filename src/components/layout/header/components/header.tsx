import styles from "./styles/header.module.scss";

export const Header = ({ children }: { children: JSX.Element }) => {
  return (
    <div id="home" className={styles.container}>
      {children}
    </div>
  );
};
