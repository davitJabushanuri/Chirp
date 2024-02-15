import Link, { LinkProps } from "next/link";

import { cn } from "@/utils/cn";

interface INavItem extends LinkProps {
  isActive: boolean;
  icon: React.ReactNode;
  text: string;
}

const NavItem = ({ href, icon, text, isActive, ...props }: INavItem) => {
  return (
    <Link
      href={href}
      {...props}
      className={cn(
        "group grid cursor-pointer place-items-center p-[0.315rem] text-h2",
        "sm:px-0 sm:py-[0.25rem]",
        "xxl:justify-start",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full p-[0.4em]",
          "group-hover:bg-neutral-500",
          "outline-offset-2 group-focus-visible:bg-neutral-500 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-secondary-100",
          "group-active:bg-neutral-600",
          "transition-colors duration-200 ease-in-out",
          "sm:p-[0.6em]",
          "xxl:pr-7",
        )}
      >
        <span
          className={cn(
            "fill-secondary-100 [&>svg]:w-[calc(var(--tw-fs-h1)+3.5px)]",
          )}
        >
          {icon}
        </span>
        <span
          className={cn(
            "ml-3 hidden font-normal text-secondary-100",
            isActive && "font-bold",
            "xxl:inline",
          )}
        >
          {text}
        </span>
      </div>
    </Link>
  );
};

export default NavItem;
