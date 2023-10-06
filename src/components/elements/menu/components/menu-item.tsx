import styles from "./styles/menu-item.module.scss";

export const MenuItem = ({
  onClick,
  color = "white",
  children,
}: {
  onClick: () => void;
  color?: "white" | "red";
  children: React.ReactNode;
}) => {
  return (
    <button
      style={{
        color: color === "white" ? "var(--clr-secondary)" : "var(--clr-red)",
      }}
      onClick={onClick}
      role="menuitem"
      className={styles.container}
    >
      {children}
    </button>
  );
};
