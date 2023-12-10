import styles from "./styles/user-not-found.module.scss";

export const UserNotFound = () => {
  return (
    <div className={styles.container}>
      <h1>This account doesn’t exist</h1>
      <p>Try searching for another.</p>
    </div>
  );
};
