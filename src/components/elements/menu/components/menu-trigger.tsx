export const MenuTrigger = ({
  children,
  isOpen,
  onClick,
  label,
  title,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  label: string;
  title: string;
}) => {
  return (
    <button
      aria-expanded={isOpen}
      aria-haspopup="menu"
      aria-label={label}
      data-title={title}
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </button>
  );
};
