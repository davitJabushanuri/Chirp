import styles from "./styles/user-screen-name.module.scss";

export const UserScreenName = ({
  screenName,
}: {
  screenName: string | undefined;
}) => {
  return <span className={styles.container}>@{screenName}</span>;
};
