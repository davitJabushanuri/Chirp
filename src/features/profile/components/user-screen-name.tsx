import styles from "./styles/user-screen-name.module.scss";

export const UserScreenName = ({ screenName }: { screenName: string }) => {
  return <div className={styles.container}>@{screenName}</div>;
};
