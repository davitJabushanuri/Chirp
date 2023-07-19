import styles from "./styles/ellipses-wrapper.module.scss";

export const EllipsisWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div tabIndex={-1} aria-hidden={true} className={styles.container}>
      {children}
    </div>
  );
};
