import { cn } from "@/utils/cn";

export const MenuItem = ({
  onClick,
  children,
  color,
  className,
}: {
  onClick: () => void;
  children: React.ReactNode;
  color?: "red" | "white";
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      role="menuitem"
      className={cn(
        "flex items-center gap-3 px-[1em] py-[0.75em] text-milli font-semibold text-secondary-100",
        "hover:bg-neutral-200",
        "outline-offset-[-2px] focus-visible:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-100",
        "active:bg-neutral-300",
        "first-of-type:rounded-t-[0.8rem] last-of-type:rounded-b-[0.8rem]",
        "transition-colors duration-100 ease-in-out",
        color === "red" && "text-red-100",
        "fill-secondary-100",
        color === "red" && "fill-red-100",
        "[&>svg]:w-h3",
        className,
      )}
    >
      {children}
    </button>
  );
};
