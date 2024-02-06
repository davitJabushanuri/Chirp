import Image from "next/image";
import React from "react";

import { cn } from "@/utils/cn";

interface IAvatar extends React.ImgHTMLAttributes<HTMLImageElement> {
  userImage: string | null;
  className?: string;
  width?: number;
  height?: number;
}

export const Avatar = ({ userImage, className, ...props }: IAvatar) => {
  return (
    <div
      className={cn(
        "relative aspect-square w-[calc(var(--tw-fs-kilo)+9px)] overflow-hidden rounded-full",
        className,
      )}
    >
      <Image
        {...props}
        src={userImage || `/user_placeholder.png`}
        alt="profile picture"
        fill={true}
        className="block size-full object-cover"
      />
    </div>
  );
};
