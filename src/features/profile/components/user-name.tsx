import React from "react";

import { VerifiedIcon } from "@/assets/verified-icon";
import { cn } from "@/utils/cn";

interface IUserName extends React.HTMLAttributes<HTMLElement> {
  name: string | undefined;
  isVerified?: boolean | undefined;
  hover?: boolean | undefined;
}

export const UserName = ({
  name,
  isVerified = false,
  hover = false,
  className,
}: IUserName) => {
  return (
    <div
      className={cn(
        "grid grid-flow-col items-center text-milli font-semibold text-secondary-100",
        hover && "hover:underline",
        className,
      )}
    >
      {name && <span className="truncate">{name}</span>}
      {isVerified && <VerifiedIcon />}
    </div>
  );
};
