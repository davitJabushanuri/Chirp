import styles from "./styles/action.module.scss";

const Action = ({ icon }: { icon: React.ReactNode }) => {
  return <div className={styles.container}>{icon}</div>;
};

export default Action;
