import styles from "./styles/action.module.scss";

const Action = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
    </div>
  );
};

export default Action;
