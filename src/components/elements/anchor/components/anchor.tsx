import Link, { LinkProps } from "next/link";

import { cn } from "@/utils/cn";

interface ILink extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export const Anchor = ({ children, className, ...props }: ILink) => {
  return (
    <Link {...props} className={cn("rounded-full p-3", className)}>
      {children}
    </Link>
  );
};
